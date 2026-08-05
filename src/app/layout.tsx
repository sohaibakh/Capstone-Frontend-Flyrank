import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capstone App",
  description: "Next.js application featuring modern file-based routing and health verification.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <div className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">{children}</div>
      </body>
    </html>
  );
}
