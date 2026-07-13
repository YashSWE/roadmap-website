import type { Metadata } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ProgressProvider } from "@/components/ProgressProvider";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://roadmap.behumoury.com"),
  title: "The Behumoury Roadmap — 12 Chapters to AI Engineer",
  description: "The full application layer across 5 blocks — free, complete from day one, no signup.",
  openGraph: {
    title: "The Behumoury Roadmap — 12 Chapters to AI Engineer",
    description: "The full application layer across 5 blocks — free, complete from day one, no signup.",
    url: "https://roadmap.behumoury.com",
    siteName: "The Behumoury Roadmap",
    images: [
      {
        url: "/FRSH.png",
        width: 1200,
        height: 630,
        alt: "The Behumoury Roadmap",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Behumoury Roadmap — 12 Chapters to AI Engineer",
    description: "The full application layer across 5 blocks — free, complete from day one, no signup.",
    images: ["/FRSH.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "The Behumoury Roadmap — 12 Chapters to AI Engineer",
              "description": "The full application layer across 5 blocks — free, complete from day one, no signup.",
              "provider": {
                "@type": "Organization",
                "name": "Behumoury",
                "sameAs": "https://behumoury.com"
              },
              "url": "https://roadmap.behumoury.com"
            })
          }}
        />
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
