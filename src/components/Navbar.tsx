import Link from "next/link";
import DesktopNavigation from "@/components/DesktopNavigation";
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

        <DesktopNavigation items={navItems} />
        <MobileNavigation items={navItems} />
      </div>
    </header>
  );
}
