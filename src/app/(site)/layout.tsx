import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Fraunces, Bricolage_Grotesque, DM_Serif_Display, Caveat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ViewCanvas from "@/components/ViewCanvas";
import LenisProvider from "@/components/LenisProvider";
import CartDrawer from "@/components/CartDrawer";
import OfferBanner from "@/components/OfferBanner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  title: "Kanaa — Homemade Goodness for Everyday Healthy Living",
  description:
    "Homemade healthy South Indian food — thokkus, kulambu mixes, 5-minute soups, powders, and snacks made with wholesome ingredients. Authentic taste, modern convenience.",
  openGraph: {
    title: "Kanaa — Homemade Goodness for Everyday Healthy Living",
    description: "Homemade healthy South Indian food, made simple for modern lifestyles.",
    siteName: "Kanaa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${fraunces.variable} ${bricolage.variable} ${dmSerifDisplay.variable} ${caveat.variable} ${cormorant.variable}`}>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <LenisProvider />
        <OfferBanner />
        {children}
        <CartDrawer />
        <ViewCanvas />
      </body>
    </html>
  );
}
