import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
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
    <html lang="en" className={roboto.className}>
      <head></head>
      <body className="bg-[#121212] m-0 p-0 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
