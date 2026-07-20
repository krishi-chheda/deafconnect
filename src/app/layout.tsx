import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deaf Connect Tasmania | Accessible Support Services",
  description: "Accessible mental health support, professional counseling, and community connection hubs for Deaf and hard-of-hearing Tasmanians. Custom layouts in Auslan, Easy Read, and Plain Language.",
  keywords: ["Deaf", "Tasmania", "Auslan", "Mental Health", "Support Services", "NDIS", "Counseling"],
  authors: [{ name: "Deaf Connect Tasmania" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-brand-navy">
        <AccessibilityProvider>
          <Navbar />
          <main className="flex-1 w-full bg-white">
            {children}
          </main>
          <Footer />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
