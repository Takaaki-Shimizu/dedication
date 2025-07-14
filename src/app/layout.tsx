import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Takaaki Shimizu | Backend Engineer Portfolio",
    template: "%s | Takaaki Shimizu",
  },
  description: "スケーラブルなシステム構築とクラウドアーキテクチャ設計を専門とするバックエンドエンジニア。Go、Python、AWSを用いた高性能なWebアプリケーション開発に従事。",
  keywords: [
    "バックエンドエンジニア", "portfolio", "software engineer", "golang", "python", "aws", 
    "microservices", "システム設計", "クラウドアーキテクチャ", "API開発", "データベース設計",
    "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "CI/CD", "DevOps"
  ],
  authors: [{ name: "Takaaki Shimizu", url: "https://dedication.vercel.app" }],
  creator: "清水 隆亮 (Takaaki Shimizu)",
  publisher: "Takaaki Shimizu",
  metadataBase: new URL("https://dedication.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "ja-JP": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://dedication.vercel.app",
    title: "清水 隆亮 | バックエンドエンジニア ポートフォリオ",
    description: "スケーラブルなシステム構築とクラウドアーキテクチャ設計を専門とするバックエンドエンジニア。Go、Python、AWSを用いた高性能なWebアプリケーション開発。",
    siteName: "Takaaki Shimizu Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "清水 隆亮 - バックエンドエンジニア ポートフォリオ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@takaakishimizu",
    creator: "@takaakishimizu",
    title: "清水 隆亮 | バックエンドエンジニア ポートフォリオ",
    description: "スケーラブルなシステム構築とクラウドアーキテクチャ設計を専門とするバックエンドエンジニア。",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
