import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://awstore.vercel.app"), // غيره بالدومين الحقيقي

  title: {
    default: "A&WStore",
    template: "%s | A&WStore",
  },

  description:
    "A&WStore براند ملابس شبابي يقدم تيشيرتات رجالي وحريمي ويونيسكس بتصميمات عصرية وجودة عالية. ستايل يومي، خامات مريحة، وشحن سريع داخل مصر.",

  keywords: [
    "A&WStore",
    "تيشيرتات رجالي",
    "تيشيرتات حريمي",
    "تيشيرتات يونيسكس",
    "ملابس شبابي",
    "Streetwear Egypt",
    "Oversized T-shirt",
    "Fashion Egypt",
    "Mens T-shirts Egypt",
    "Womens T-shirts Egypt",
  ],

  authors: [{ name: "A&WStore" }],
  creator: "A&WStore",
  publisher: "A&WStore",

  openGraph: {
    title: "A&WStore | Youth Fashion Brand",
    description:
      "Discover premium men & women T-shirts with modern streetwear style. Designed for comfort, confidence, and everyday fashion.",
    url: "https://awstore.vercel.app",
    siteName: "A&WStore",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/og.jpg", // ضع صورة 1200x630 داخل public
        width: 1200,
        height: 630,
        alt: "A&WStore Fashion Brand",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "A&WStore | Streetwear Fashion",
    description:
      "Modern T-shirts for men & women. Clean design. Premium feel.",
    images: ["/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>
          <Toaster position="top-center" />
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
