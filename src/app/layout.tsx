import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Elizabethton SDA Church",
  description:
    "Elizabethton Seventh-day Adventist Church — sharing hope, growing faith, and serving our community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SiteShell>{children}</SiteShell>

        <Script
          src="https://kit.fontawesome.com/7178c88896.js"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
