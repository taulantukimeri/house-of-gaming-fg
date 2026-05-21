import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "House of Gaming FG — Storefront",
  description:
    "Curated gear for people who play seriously. Chairs, desks, keyboards, mice, headsets, and accessories.",
  icons: { icon: "/assets/logo-mark.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
