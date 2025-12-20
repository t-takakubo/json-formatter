import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSON Formatter - JSONを整形して見やすく表示",
  description:
    "JSONを入力するだけで、整形して見やすく表示できるシンプルなWebツールです。シンタックスハイライト、ダークモード対応。",
  keywords: [
    "JSON",
    "フォーマッター",
    "整形",
    "JSON整形",
    "JSONツール",
    "シンタックスハイライト",
    "オンラインツール",
  ],
  authors: [{ name: "JSON Formatter" }],
  creator: "JSON Formatter",
  publisher: "JSON Formatter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JSON Formatter - JSONを整形して見やすく表示",
    description:
      "JSONを入力するだけで、整形して見やすく表示できるシンプルなWebツールです。シンタックスハイライト、ダークモード対応。",
    url: "/",
    siteName: "JSON Formatter",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter - JSONを整形して見やすく表示",
    description:
      "JSONを入力するだけで、整形して見やすく表示できるシンプルなWebツールです。シンタックスハイライト、ダークモード対応。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console verification can be added here
    // google: 'verification_code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON Formatter",
    description:
      "JSONを入力するだけで、整形して見やすく表示できるシンプルなWebツールです。シンタックスハイライト、ダークモード対応。",
    url: baseUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
    featureList: [
      "JSONの整形と見やすい表示",
      "シンタックスハイライト",
      "ダークモード対応",
      "S3へのアップロード機能",
    ],
  };

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
