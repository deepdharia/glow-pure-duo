import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glow Pure Duo | Glam Gear Global",
  description:
    "Premium unisex de-tan skincare soap. Coconut oil, saffron & sandalwood. Two 100g glass-like bars. Everyday cleansing, elevated.",
  keywords: "Glow Pure Duo, Glam Gear Global, saffron soap, de-tan soap, premium soap India",
  openGraph: {
    title: "Glow Pure Duo | Glam Gear Global",
    description: "Glow Like Gold with the Power of Saffron. Premium duo soap.",
    url: "https://glamgearglobal.in",
    siteName: "Glam Gear Global",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a0b] text-[#f5f0e8]">
        {children}
      </body>
    </html>
  );
}
