import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Genius Shop",
  description: "Vitrine ecommerce MVP com catálogo mockado e CTA para WhatsApp.",
  icons: {
    icon: [
      { url: "/camisa/favicon_io/favicon.ico" },
      { url: "/camisa/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/camisa/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/camisa/favicon_io/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/camisa/favicon_io/site.webmanifest" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}