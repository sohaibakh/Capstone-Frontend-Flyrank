"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  label: string;
  href: string;
}

interface DesktopNavigationProps {
  items: NavigationItem[];
}

export default function DesktopNavigation({ items }: DesktopNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
      {items.map((item) => {
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
      <Link
        href="/compare?q=MacBook%20Pro%20M3"
        className="cb-action rounded-[100px] bg-[#0052ff] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-[#0052ff]/20 hover:bg-[#003ecc] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0052ff]/18"
      >
        Run audit
      </Link>
    </nav>
  );
}
