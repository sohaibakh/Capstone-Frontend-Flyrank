import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VantaCloudsBackground from "@/components/VantaCloudsBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DealSight AI - Shopping Trust Intelligence",
  description: "AI-powered product price comparison, seller reputation analysis, fake discount detection, and warranty risk scoring.",
  icons: {
    icon: "/dealsight-logo.png",
    apple: "/dealsight-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden antialiased selection:bg-[#0052ff] selection:text-white">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <VantaCloudsBackground className="fixed inset-0 z-0" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.66)_44%,rgba(255,255,255,0.9)_100%)]" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" className="flex-1 w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
