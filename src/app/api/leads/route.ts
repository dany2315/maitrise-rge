import { NextResponse, type NextRequest } from "next/server";
import { appendRow, SheetsConfigError } from "@/lib/leads/google-sheets";
import { isRateLimited } from "@/lib/leads/rate-limit";
import { buildRow } from "@/lib/leads/row";
import { fieldErrors, leadSchema } from "@/lib/leads/schema";

const MIN_FILL_TIME_MS = 2500;

const fail = (status: number, message: string, errors?: Record<string, string>) =>
  NextResponse.json({ ok: false, message, errors }, { status });

export async function POST(request: NextRequest) {
  // Refuse les envois provenant d'un autre site.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.nextUrl.host) {
    return fail(403, "Origine de la requête non autorisée.");
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "inconnue";
  if (isRateLimited(ip)) {
    return fail(429, "Trop de demandes envoyées en peu de temps. Merci de réessayer dans quelques minutes.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Requête illisible. Merci de réessayer.");
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    if (errors.website || errors.startedAt) {
      return fail(400, "Votre demande n'a pas pu être validée. Merci de réessayer.");
    }
    return fail(422, "Certains champs sont à corriger.", errors);
  }

  const lead = parsed.data;
  if (Date.now() - lead.startedAt < MIN_FILL_TIME_MS) {
    return fail(400, "Votre demande n'a pas pu être validée. Merci de patienter un instant puis de réessayer.");
  }

  try {
    await appendRow(buildRow(lead));
  } catch (error) {
    console.error("[leads] Enregistrement impossible :", error instanceof Error ? error.message : error);
    const message =
      error instanceof SheetsConfigError
        ? "Le service d'enregistrement n'est pas encore configuré. Votre demande n'a pas été transmise."
        : "Le service d'enregistrement ne répond pas. Votre demande n'a pas été transmise, merci de réessayer.";
    return fail(503, message);
  }

  return NextResponse.json({ ok: true });
}
