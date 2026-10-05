import "server-only";
import { createSign } from "node:crypto";

/**
 * Ajout de lignes dans le Google Sheet du client via un compte de service.
 * Les identifiants restent côté serveur (variables d'environnement) :
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID,
 *   GOOGLE_SHEET_TAB (optionnel, « Demandes » par défaut).
 * Le Google Sheet doit être partagé en écriture avec l'email du compte de service.
 */

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

type Credentials = { email: string; privateKey: string; sheetId: string; tab: string };

export class SheetsConfigError extends Error {}

function readCredentials(): Credentials {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!email || !privateKey || !sheetId) {
    throw new SheetsConfigError("Configuration Google Sheets incomplète.");
  }
  return { email, privateKey, sheetId, tab: process.env.GOOGLE_SHEET_TAB || "Demandes" };
}

const base64url = (input: string | Buffer) => Buffer.from(input).toString("base64url");

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(creds: Credentials): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({ iss: creds.email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(creds.privateKey).toString("base64url");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Authentification Google refusée (${response.status}).`);
  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

/** Ajoute une ligne et ne résout qu'après confirmation de Google. */
export async function appendRow(row: (string | number)[]): Promise<void> {
  const creds = readCredentials();
  const token = await getAccessToken(creds);
  const range = encodeURIComponent(`${creds.tab}!A1`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${creds.sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [row] }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    if (response.status === 401) cachedToken = null;
    throw new Error(`Écriture Google Sheets refusée (${response.status}).`);
  }
  const data = (await response.json()) as { updates?: { updatedRows?: number } };
  if (!data.updates?.updatedRows) throw new Error("Google Sheets n'a confirmé aucune ligne.");
}
