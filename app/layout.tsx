import type { Metadata } from "next";
import "./globals.css";

// Import Next.js Metadata type for SEO and page info
export const metadata: Metadata = {
  title: "Jerod Hollen - Portfolio",
  description: "Portfolio of Jerod Hollen - Developer, Designer, and Creative",
};

import ClientLayout from "../components/ClientLayout";

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
      <body>
        <ClientLayout showBreadcrumbs>{children}</ClientLayout>
      </body>
    </html>
  );
}
