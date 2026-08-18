import Link from "next/link";
import { AuditIcon, MatrixIcon, ShieldIcon } from "@/components/Icons";

const productLinks = [
  { label: "Compare products", href: "/compare" },
  { label: "Saved audits", href: "/history" },
  { label: "Trust dashboard", href: "/dashboard" },
];

const capabilities = [
  { label: "Seller reputation", icon: ShieldIcon },
  { label: "Fake discount review", icon: AuditIcon },
  { label: "Country-wise ranking", icon: MatrixIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#dee1e6] bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 text-[#0a0b0d]">
              <span className="text-lg font-semibold">
                DealSight <span className="text-[#0052ff]">AI</span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#5b616e]">
              Shopping trust intelligence for comparing product prices, seller reputation, warranty risk, and suspicious
              discount signals across markets.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#0a0b0d]">Product</h2>
            <nav className="mt-4 flex flex-col gap-3">
              {productLinks.map((link) => (
                <Link key={link.href} href={link.href} className="cb-action w-fit rounded-full text-sm text-[#5b616e] hover:text-[#0052ff]">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#0a0b0d]">Trust signals</h2>
            <div className="mt-4 space-y-3">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="cb-action flex items-center gap-3 rounded-lg text-sm text-[#5b616e]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f3] text-[#0052ff]">
                      <Icon className="h-4 w-4" />
                    </span>
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[#dee1e6] pt-6 text-xs text-[#5b616e] sm:flex-row sm:items-center">
          <p>© 2026 DealSight AI. Built for the Flyrank AI Frontend Engineering Capstone.</p>
          <p>AI recommendations are decision support, not a guarantee of seller reliability.</p>
        </div>
      </div>
    </footer>
  );
}
