import type { Metadata } from "next";
import { Roboto, Merriweather, Inter, Playfair_Display } from "next/font/google";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${merriweather.variable} ${inter.variable} ${playfair.variable}`}>
      <head></head>
      <body className="bg-[#121212] m-0 p-0 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
