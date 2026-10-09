import type { Metadata } from "next";
import { Roboto, Merriweather, Inter, Playfair_Display, Shrikhand } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const shrikhand = Shrikhand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
});

// Import Next.js Metadata type for SEO and page info
export const metadata: Metadata = {
  title: "Jerod Hollen — Full-Stack Engineer",
  description:
    "Portfolio of Jerod Hollen, full-stack engineer (React, Next.js, TypeScript, Ruby on Rails). Automation, edtech, and creative systems — open to frontend, solutions, and AI engineering roles.",
  keywords: [
    "Jerod Hollen",
    "Full-Stack Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Ruby on Rails",
    "Portfolio",
  ],
  authors: [{ name: "Jerod Hollen" }],
  openGraph: {
    title: "Jerod Hollen — Full-Stack Engineer",
    description:
      "Full-stack engineer specializing in React, Next.js, TypeScript, and Ruby on Rails. I turn manual bottlenecks into automated systems.",
    type: "website",
    url: "https://www.jerodhollen.com",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jerod Hollen",
  jobTitle: "Full-Stack Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bellingham",
    addressRegion: "WA",
  },
  url: "https://www.jerodhollen.com",
  sameAs: [
    "https://www.linkedin.com/in/jerod-hollen",
    "https://github.com/jhollen",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Ruby on Rails",
    "Automation",
    "Playwright",
  ],
};

// Runs before first paint: applies the saved theme (or OS preference) with no flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem('jh-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${merriweather.variable} ${inter.variable} ${playfair.variable} ${shrikhand.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-surface-base m-0 p-0 text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
