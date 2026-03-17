import type { Metadata } from "next";
import { Roboto, Merriweather } from "next/font/google";
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

// Import Next.js Metadata type for SEO and page info
export const metadata: Metadata = {
  title: "Jerod Hollen - Portfolio",
  description: "Portfolio of Jerod Hollen - Developer, Designer, and Creative",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${merriweather.variable}`}>
      <head></head>
      <body className="bg-[#121212] m-0 p-0 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
