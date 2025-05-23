import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeModeProvider from "@/providers/ThemeModeProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import DiscountBanner from "@/components/DiscountCard";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vish Buy",
  description: "Buy you're things...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeModeProvider>
          <ReduxProvider>
            {" "}
            <DiscountBanner />
            <Navbar />
            {children}
          </ReduxProvider>
        </ThemeModeProvider>
      </body>
    </html>
  );
}
