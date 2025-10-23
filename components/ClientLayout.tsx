// ClientLayout.tsx
// Client component wrapper for Layout to enable usePathname hook
"use client";

import Layout from "./Layout";

interface ClientLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
}

export default function ClientLayout({
  children,
  showBreadcrumbs = false,
  breadcrumbItems = [],
}: ClientLayoutProps) {
  return (
    <Layout showBreadcrumbs={showBreadcrumbs} breadcrumbItems={breadcrumbItems}>
      {children}
    </Layout>
  );
}
