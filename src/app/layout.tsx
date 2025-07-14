import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Takaki Shimizu | Backend Engineer Portfolio",
  description: "Backend engineer specializing in scalable systems, cloud architecture, and modern development practices. Experienced in Go, Python, AWS, and microservices.",
  keywords: ["backend engineer", "portfolio", "software engineer", "golang", "python", "aws", "microservices"],
  authors: [{ name: "Takaki Shimizu" }],
  creator: "Takaki Shimizu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dedication.vercel.app",
    title: "Takaki Shimizu | Backend Engineer Portfolio",
    description: "Backend engineer specializing in scalable systems, cloud architecture, and modern development practices.",
    siteName: "Takaki Shimizu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Takaki Shimizu | Backend Engineer Portfolio",
    description: "Backend engineer specializing in scalable systems, cloud architecture, and modern development practices.",
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
