import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
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
  title: "JSON Formatter - 無料オンラインJSONフォーマッター・バリデーター",
  description:
    "JSONを貼り付けるだけで即座に整形・バリデーション。YAML変換・JSON圧縮（Minify）にも対応。シンタックスハイライト、コピー機能、ダークモード対応。登録不要・完全無料のオンラインJSONツールです。",
  keywords: [
    "JSON",
    "フォーマッター",
    "整形",
    "JSON整形",
    "JSONツール",
    "JSONフォーマット",
    "シンタックスハイライト",
    "オンラインツール",
    "JSON formatter",
    "JSON beautifier",
    "JSON validator",
    "JSON parser",
    "JSONバリデーター",
    "JSON整形ツール",
    "JSON可視化",
    "JSONビューワー",
    "JSON無料",
    "JSON登録不要",
    "JSON pretty print",
    "オンラインツール無料",
    "YAML変換",
    "JSONからYAML",
    "JSON to YAML",
    "JSON圧縮",
    "JSON minify",
    "JSONミニファイ",
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
    title: "JSON Formatter - 無料オンラインJSONフォーマッター・バリデーター",
    description:
      "JSONを貼り付けるだけで即座に整形・バリデーション。YAML変換・JSON圧縮（Minify）にも対応。シンタックスハイライト、コピー機能、ダークモード対応。登録不要・完全無料のオンラインJSONツールです。",
    url: "/",
    siteName: "JSON Formatter",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter - 無料オンラインJSONフォーマッター・バリデーター",
    description:
      "JSONを貼り付けるだけで即座に整形・バリデーション。YAML変換・JSON圧縮（Minify）にも対応。シンタックスハイライト、コピー機能、ダークモード対応。登録不要・完全無料のオンラインJSONツールです。",
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

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON Formatter",
    description:
      "JSONを貼り付けるだけで即座に整形・バリデーション。YAML変換・JSON圧縮（Minify）にも対応。シンタックスハイライト、コピー機能、ダークモード対応。登録不要・完全無料のオンラインJSONツールです。",
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
      "JSONバリデーション",
      "ワンクリックコピー",
      "YAML変換（JSON to YAML）",
      "JSON圧縮（Minify）",
      "ドラッグ＆ドロップでJSONファイル読み込み",
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "JSONを整形する方法",
    description: "JSON Formatterを使ってJSONを整形する手順",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "JSONを貼り付ける",
        text: "左側のテキストエリアに整形したいJSONを貼り付けてください。",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Formatボタンをクリック",
        text: "「Format」ボタンをクリックするとJSONが自動的に整形・バリデーションされます。",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "結果をコピーする",
        text: "右側に整形済みのJSONが表示されます。Copyボタンでクリップボードにコピーできます。",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "JSON Formatterは無料で使えますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、完全無料・登録不要でご利用いただけます。",
        },
      },
      {
        "@type": "Question",
        name: "JSONのバリデーション（構文チェック）はできますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、入力されたJSONの構文エラーを自動で検出し、エラー内容を表示します。",
        },
      },
      {
        "@type": "Question",
        name: "どんなJSONに対応していますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "標準的なJSON形式すべてに対応しています。ネストしたオブジェクト・配列も正しく整形できます。",
        },
      },
      {
        "@type": "Question",
        name: "YAML変換はできますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、JSONをYAML形式に変換する機能を搭載しています。「→ YAML」ボタンをクリックするだけで変換できます。",
        },
      },
    ],
  };

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
