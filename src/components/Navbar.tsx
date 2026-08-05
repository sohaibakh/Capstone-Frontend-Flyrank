"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { SearchIcon } from "@/components/Icons";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Compare", href: "/compare" },
  { label: "History", href: "/history" },
  { label: "Health", href: "/health" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings", href: "/settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/compare?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#000000]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-medium text-lg text-white tracking-tight shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0099ff] text-white font-bold text-xs shadow-[0_0_12px_rgba(0,153,255,0.4)]">
            DS
          </span>
          <span className="font-semibold text-base text-white tracking-tight">
            DealSight <span className="text-[#0099ff]">AI</span>
          </span>
        </Link>

        {/* Global Search Input (Framer Dark Input Styling) */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search product (e.g. Sony WH-1000XM5, MacBook Pro)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-[#090909] px-4 py-1.5 pl-9 text-xs text-white placeholder:text-white/40 focus:border-[#0099ff] focus:outline-none focus:ring-1 focus:ring-[#0099ff] transition-all"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#a6a6a6]">
              <SearchIcon className="w-3.5 h-3.5 text-[#a6a6a6]" />
            </span>
          </div>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-[15px] shrink-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-medium ${
                  isActive
                    ? "bg-[#0099ff] text-white font-semibold"
                    : "text-[#a6a6a6] hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-full p-2 text-[#a6a6a6] hover:bg-white/10 hover:text-white focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 px-4 pt-3 pb-4 bg-[#000000]">
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <input
              type="text"
              placeholder="Search product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-[#090909] px-3.5 py-2 text-xs text-white placeholder:text-white/40"
            />
          </form>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#0099ff] text-white font-semibold"
                      : "text-[#a6a6a6] hover:bg-white/10 hover:text-white"
                  }`}
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
