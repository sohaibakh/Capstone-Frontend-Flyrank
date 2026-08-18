"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Compare", href: "/compare" },
  { label: "History", href: "/history" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dee1e6] bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="cb-action flex items-center gap-2.5 rounded-full text-[#0a0b0d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0052ff]/15">
          <Image src="/dealsight-shield-logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" priority />
          <span className="text-base font-semibold tracking-0">
            DealSight <span className="text-[#0052ff]">AI</span>
          </span>
        </Link>

        <div className="hidden flex-1 sm:block" />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`cb-action rounded-[100px] px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0052ff]/15 ${
                  isActive ? "bg-[#0a0b0d] text-white shadow-sm" : "text-[#5b616e] hover:bg-[#eef0f3] hover:text-[#0a0b0d]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/compare?q=MacBook%20Pro%20M3" className="cb-action rounded-[100px] bg-[#0052ff] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-[#0052ff]/20 hover:bg-[#003ecc] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0052ff]/18">
            Run audit
          </Link>
        </nav>

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
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="animate-soft-scale border-t border-[#dee1e6] bg-white/96 px-4 py-4 shadow-lg shadow-black/5 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="cb-action rounded-[100px] px-4 py-2 text-sm font-medium text-[#5b616e] hover:bg-[#eef0f3] hover:text-[#0a0b0d]"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
