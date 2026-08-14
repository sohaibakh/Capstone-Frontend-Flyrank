"use client";

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
    <header className="sticky top-0 z-50 w-full border-b border-[#dee1e6] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-[#0a0b0d]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0052ff] text-sm font-semibold text-white">
            DS
          </span>
          <span className="text-base font-semibold tracking-0">
            DealSight <span className="text-[#0052ff]">AI</span>
          </span>
        </Link>

        <div className="hidden flex-1 sm:block" />

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[100px] px-4 py-2 text-sm font-medium transition ${
                  isActive ? "bg-[#eef0f3] text-[#0a0b0d]" : "text-[#5b616e] hover:bg-[#eef0f3] hover:text-[#0a0b0d]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/compare?q=MacBook%20Pro%20M3" className="rounded-[100px] bg-[#0052ff] px-5 py-2 text-sm font-semibold text-white hover:bg-[#003ecc]">
            Run audit
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#eef0f3] text-[#0a0b0d] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="text-lg">{mobileMenuOpen ? "x" : "="}</span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#dee1e6] bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-[100px] px-4 py-2 text-sm font-medium text-[#5b616e] hover:bg-[#eef0f3] hover:text-[#0a0b0d]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
