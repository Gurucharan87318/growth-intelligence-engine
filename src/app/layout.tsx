import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Growth Intelligence Engine",
  description:
    "A strategy-focused product analysis system connecting market opportunity, growth quality, unit economics, and decision-making.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
