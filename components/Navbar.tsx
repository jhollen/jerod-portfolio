// Navbar.tsx
// This component renders the navigation bar for the site.
// It uses Next.js Link for client-side navigation.

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
      {/* Site title/logo on the left */}
      <Link
        href="/"
        className="font-bold rounded-full bg-[#7a9c7d] text-white w-10 h-10 flex items-center justify-center text-lg shadow-inner"
      >
        JH
      </Link>
      {/* Navigation links on the right */}
      <div className="flex gap-4 items-center">
        {/* Resume Link */}
        <Link
          href="/resume"
          className="font-semibold text-[#7a9c7d] hover:underline transition"
        >
          Resume
        </Link>
        {/* Contact Link */}
        <Link
          href="/contact"
          className="font-semibold text-[#7a9c7d] hover:underline transition"
        >
          Contact
        </Link>
        {/* GitHub Icon */}
        <Link
          href="https://github.com/jhollen"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#7a9c7d"
              d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.188 22 16.435 22 12.012 22 6.484 17.523 2 12 2Z"
            />
          </svg>
        </Link>
        {/* LinkedIn Icon */}
        <Link
          href="https://www.linkedin.com/in/Jerod-hollen"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#7a9c7d"
              d="M4.983 3.5C3.343 3.5 2 4.844 2 6.484c0 1.64 1.343 2.984 2.983 2.984 1.64 0 2.984-1.344 2.984-2.984C7.967 4.844 6.623 3.5 4.983 3.5zM2.4 8.25h5.167v13.5H2.4v-13.5zM9.75 8.25h4.958v1.842h.07c.69-1.31 2.377-2.692 4.895-2.692C22.083 7.4 24 9.318 24 12.542v9.208h-5.167v-8.168c0-1.947-.035-4.448-2.708-4.448-2.71 0-3.125 2.116-3.125 4.306v8.31H9.75v-13.5z"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
