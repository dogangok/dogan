import Archives from "@/components/layout/archives/archives";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import Menu from "@/components/layout/menu/menu";
import Newsletter from "@/components/layout/newsletter/newsletter";
import Sponsors from "@/components/layout/sponsors/sponsors";
import ThemeProvider from "@/components/providers/theme-provider/theme-provider";
import { SITE_METADATA, SITE_VIEWPORT } from "@/constants/metadata";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = SITE_METADATA;
export const viewport: Viewport = SITE_VIEWPORT;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="home" suppressHydrationWarning>
      <body className={`${inter.className} home`}>
        <ThemeProvider>
          <Header />
          <Menu />
          {children}
          <Archives />
          <Newsletter />
          <Sponsors />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
