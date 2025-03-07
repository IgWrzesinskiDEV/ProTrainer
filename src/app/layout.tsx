import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://protrainer.pro";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ProTrainer | Professional Training Platform",
    template: "%s | ProTrainer",
  },
  description:
    "ProTrainer helps you achieve your fitness goals with personalized workout plans, expert guidance, and progress tracking. Start your fitness journey today!",
  keywords: [
    "personal trainer",
    "fitness app",
    "workout planner",
    "exercise tracker",
    "fitness goals",
    "strength training",
    "cardio workouts",
    "nutrition planning",
    "fitness progress",
    "personal training",
  ],
  authors: [{ name: "ProTrainer Team" }],
  creator: "ProTrainer Inc.",
  publisher: "ProTrainer Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "fitness",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "ProTrainer | Transform Your Fitness Journey",
    description:
      "Achieve your fitness goals with personalized workout plans, expert guidance, and comprehensive progress tracking.",
    siteName: "ProTrainer",
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "ProTrainer - Professional Training Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProTrainer | Professional Training Platform",
    description:
      "Achieve your fitness goals with personalized workout plans, expert guidance, and comprehensive progress tracking.",
    creator: "@protrainer",
    images: [`${baseUrl}/images/og-image.jpg`],
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
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        url: "/favicon/icon.png",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/favicon/icon.svg",
      },
    ],
  },
  manifest: "/favicon/manifest.json",
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": `${baseUrl}/en-US`,
      // "es-ES": `${baseUrl}/es-ES`,
    },
  },

  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    // other: {
    //   me: ["my-email@example.com", "https://example.com/about-me"],
    //   "apple-mobile-web-app-title": "ProTrainer",
    // },
  },
  appleWebApp: {
    title: "ProTrainer",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  applicationName: "ProTrainer",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  appLinks: {
    // ios: {
    //   url: "https://apps.apple.com/app/protrainer",
    //   app_store_id: "app-store-id",
    // },
    // android: {
    //   package: "com.example.protrainer",
    //   app_name: "ProTrainer",
    // },
    web: {
      url: baseUrl,
      should_fallback: true,
    },
  },
  // archives: [`${baseUrl}/archives`],
  // assets: [`${baseUrl}/assets`],
  // bookmarks: [`${baseUrl}/fitness-articles`],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.className} scrollBarRectangle trainerDataSquareScrollbar antialiased min-h-screen`}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {children}
        </AppRouterCacheProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
