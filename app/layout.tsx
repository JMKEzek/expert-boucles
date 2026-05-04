import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://expert-boucles.com";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Expert Boucles - Coiffeur cheveux bouclés Paris 75009",
    template: "%s | Expert Boucles",
  },
  description:
    "Expert Boucles : coiffeur spécialisé cheveux bouclés à Paris 75009. Coupes, soins et styling pour cheveux naturels.",
  keywords: "coiffeur bouclés paris, cheveux bouclés, coupe, styling, soins",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Expert Boucles",
    title: "Expert Boucles - Coiffeur cheveux bouclés Paris 75009",
    description:
      "Coupes, soins et styling sur mesure pour cheveux bouclés, frisés et texturés à Paris 75009.",
    images: [
      {
        url: "/realisations.avif",
        width: 1200,
        height: 630,
        alt: "Réalisations Expert Boucles",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorantGaramond.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-blanc text-noir">{children}</body>
    </html>
  );
}
