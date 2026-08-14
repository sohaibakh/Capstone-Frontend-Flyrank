import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DealSight AI - Shopping Trust Intelligence",
  description: "AI-powered product price comparison, seller reputation analysis, fake discount detection, and warranty risk scoring.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#0052ff] selection:text-white">
        <Navbar />
        <div className="flex-1 max-w-[1200px] w-full mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
