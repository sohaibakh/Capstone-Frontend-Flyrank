import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DealSight AI — Smart Price & Specs Intelligence",
  description: "Cinematic, AI-powered real-time multi-store price comparison, fake discount detection, and buying intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#000000] text-white min-h-screen flex flex-col antialiased selection:bg-[#0099ff] selection:text-white">
        <Navbar />
        <div className="flex-1 max-w-[1200px] w-full mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
      </body>
    </html>
  );
}
