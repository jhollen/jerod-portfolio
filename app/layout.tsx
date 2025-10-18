import type { Metadata } from "next";
import "./globals.css";

// Import Next.js Metadata type for SEO and page info
export const metadata: Metadata = {
  title: "Next.js Hero App",
  description: "A simple Next.js application with a hero section",
};

import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Load the Lato font from public/fonts */}
        <link
          rel="preload"
          href="/fonts/Lato-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* Inject font-face CSS for Lato */}
        <style>
          {`
            @font-face {
              font-family: 'Lato';
              src: url('/fonts/Lato-Regular.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
            body {
              font-family: 'Lato', sans-serif;
            }
          `}
        </style>
      </head>
      {/* Main body styles: antialiasing, min height, background, and text color */}
      <body className="antialiased min-h-dvh bg-background text-foreground">
        <header className="border-b">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
