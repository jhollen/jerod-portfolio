import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        {/* Import Roboto from Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <style>
          {`
            body {
              font-family: 'Roboto', sans-serif;
            }
          `}
        </style>
      </head>
      <body className="bg-[#121212] m-0 p-0 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
