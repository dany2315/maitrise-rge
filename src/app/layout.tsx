import type { Metadata, Viewport } from "next";
import { Figtree, Outfit } from "next/font/google";
import { ConsentManager } from "@/components/consent/consent-manager";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Logo } from "@/components/layout/logo";
import { site } from "@/config/site";
import "./globals.css";

const display = Outfit({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Maîtrise RGE — Rénovation énergétique, pompes à chaleur et isolation",
    template: "%s | Maîtrise RGE",
  },
  description:
    "Maîtrise RGE accompagne les particuliers dans leur rénovation énergétique : pompes à chaleur air/eau, isolation des combles et des murs, solaire et équipements thermodynamiques. Estimez vos aides en ligne.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f8f2",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/symbol.png`,
  description: site.shortDescription,
  ...(site.contact.phoneE164 && { telephone: site.contact.phoneE164 }),
  ...(site.contact.email && { email: site.contact.email }),
  ...(site.contact.serviceArea && { areaServed: site.contact.serviceArea }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // La classe « js » est ajoutée avant l'hydratation : écart attendu sur cette seule balise.
    <html
      lang="fr"
      className={`${display.variable} ${body.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Active les animations d'apparition seulement si JavaScript est disponible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only z-50 rounded-full bg-brand-800 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <Header logo={<Logo priority />} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <ConsentManager />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
