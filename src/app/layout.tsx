import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import Menu from "@/components/layout/menu/menu";
import ThemeProvider from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Minimalissimo – Minimalism in Design",
  description:
    "Minimalissimo magazine is a celebration of minimalism in design. We aim to inspire creatives and showcase the finest examples of architecture, …",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="home">
      <body className={`${inter.className} home`}>
        <ThemeProvider>
          <Header />
          <Menu />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
