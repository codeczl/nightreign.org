import './globals.css';
import '@radix-ui/themes/styles.css';
import React from 'react';
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout';
import { Metadata, Viewport } from 'next'
import { GoogleAnalyticsScript } from "@/components/analytics/GoogleAnalyticsScript";
import { PlausibleAnalyticsScript } from "@/components/analytics/PlausibleAnalyticsScript";
import GoogleAdsenseScript from "@/components/ads/GoogleAdsenseScript";
import { ThemeProvider } from "next-themes"
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { generateMetaTags } from '@/components/MetaTags'

const inter = Inter({ subsets: ['latin'] })
const sansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: {
    template: '%s | Nightreign Wiki 2025',
    default: 'Nightreign | Complete Elden Ring Expansion Wiki & Guides 2025'
  },
  description: 'Comprehensive Nightreign guides, release info, and boss strategies for the new Elden Ring expansion. Explore Nightreign news, gameplay mechanics, and tips.',
  keywords: 'Nightreign, Elden Ring Nightreign, Nightreign guide, Nightreign bosses, Nightreign walkthrough, Nightreign release date',
  authors: [{ name: 'Nightreign.org' }],
  creator: 'Nightreign.org',
  publisher: 'Nightreign.org',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nightreign.org'),
  openGraph: {
    title: 'Nightreign | Complete Elden Ring Expansion Wiki & Guides 2025',
    description: 'Comprehensive Nightreign guides, release info, and boss strategies for the new Elden Ring expansion. Explore Nightreign news, gameplay mechanics, and tips.',
    url: 'https://nightreign.org',
    siteName: 'Nightreign.org',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nightreign | Complete Elden Ring Expansion Wiki & Guides',
    description: 'Comprehensive Nightreign guides, release info, and boss strategies for the new Elden Ring expansion.',
    creator: '@nightreign',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
    { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" }
  ],
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Roblox Code"
  },
  ...generateMetaTags({
    title: 'Roblox Code | Latest Promo Codes & Redeem Guide',
    description: 'Find and redeem the latest Roblox promo codes. Get free items, accessories, and in-game bonuses. Updated daily with working codes and step-by-step redemption guides.',
    url: 'https://robloxcode.net',
    imageUrl: 'https://robloxcode.net/og-image.jpg'
  }),
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <GoogleAnalyticsScript />
      </head>
      <body className={cn(inter.className, sansFont.variable)}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark"
            enableSystem={false}
          >
            <Layout>{children}</Layout>
            <GoogleAdsenseScript />
            <PlausibleAnalyticsScript />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}