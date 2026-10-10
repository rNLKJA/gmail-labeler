import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gmail Labeler - AI-Powered Email Triage Skill",
  description: "An intelligent Gmail triage skill for AI coding assistants that automatically labels and organizes email by sender and provider. Interactive showcase with provider taxonomy, rule playground, and dry-run simulator.",
  keywords: ["Gmail", "email", "triage", "labeling", "AI", "automation", "productivity", "Claude", "MCP"],
  authors: [{ name: "Sunchuangyu Huang", url: "https://github.com/rNLKJA" }],
  openGraph: {
    title: "Gmail Labeler - AI-Powered Email Triage Skill",
    description: "Automatically label and organize Gmail by sender/provider with this AI skill for Claude Code and Cursor.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
