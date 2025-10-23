import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { Container } from "./Container";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
}

export default function Layout({
  children,
  showBreadcrumbs = false,
  breadcrumbItems = [],
}: LayoutProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Generate breadcrumbs based on path if not explicitly provided
  const getBreadcrumbs = () => {
    if (breadcrumbItems.length > 0) return breadcrumbItems;

    const paths = pathname.split("/").filter(Boolean);
    if (paths.length === 0) return [];

    return paths.map((path, i) => {
      // Create proper label from path segment (e.g., "project-name" -> "Project Name")
      const label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Create href for all except the last item (current page)
      const href =
        i < paths.length - 1
          ? `/${paths.slice(0, i + 1).join("/")}`
          : undefined;

      return { label, href };
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      {/* Header with Navbar (ensure it's always above page content) */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className={`flex-grow${isHome ? "" : " pt-28"}`}>
        {showBreadcrumbs && pathname !== "/" && (
          <Container>
            <div className="py-4">
              <Breadcrumbs items={getBreadcrumbs()} />
            </div>
          </Container>
        )}
        {/* Page Content (pages manage their own layout widths) */}
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
