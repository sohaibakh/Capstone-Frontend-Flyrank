import Link from "next/link";
import MobileNavigation from "@/components/MobileNavigation";

const navItems = [
  { label: "Demo", href: "/demo" },
  { label: "Compare", href: "/compare" },
  { label: "History", href: "/history" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dee1e6] bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="cb-action flex items-center gap-2.5 rounded-full text-[#0a0b0d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0052ff]/15">
          <span className="text-base font-semibold tracking-0">
            DealSight <span className="text-[#0052ff]">AI</span>
          </span>
        </Link>

        <div className="hidden flex-1 sm:block" />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cb-action rounded-[100px] px-4 py-2 text-sm font-medium text-[#5b616e] hover:bg-[#eef0f3] hover:text-[#0a0b0d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0052ff]/15"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/compare?q=MacBook%20Pro%20M3" className="cb-action rounded-[100px] bg-[#0052ff] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-[#0052ff]/20 hover:bg-[#003ecc] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0052ff]/18">
            Run audit
          </Link>
        </nav>

        <MobileNavigation items={navItems} />
      </div>
    </header>
  );
}
