import React from "react";
import Link from "next/link";

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumbs">
      <ol className="flex items-center space-x-3 text-sm text-text-muted">
        <li>
          <Link
            href="/"
            className="hover:text-primary transition-colors px-1 py-0.5"
          >
            Home
          </Link>
        </li>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <svg
                className="h-4 w-4 text-border"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`hover:text-primary transition-colors px-1 py-0.5`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium px-1 py-0.5">{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
