"use client";

import Link from "next/link";
import { useState } from "react";

interface MobileNavigationProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export default function MobileNavigation({ items }: MobileNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileMenuOpen((open) => !open)}
        className="cb-action inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#eef0f3] text-[#0a0b0d] md:hidden"
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        <span className="text-lg" aria-hidden="true">
          {mobileMenuOpen ? "x" : "="}
        </span>
      </button>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-16 animate-soft-scale border-t border-[#dee1e6] bg-white/96 px-4 py-4 shadow-lg shadow-black/5 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="cb-action rounded-[100px] px-4 py-2 text-sm font-medium text-[#5b616e] hover:bg-[#eef0f3] hover:text-[#0a0b0d]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
