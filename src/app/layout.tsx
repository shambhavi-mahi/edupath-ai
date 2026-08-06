import type { Metadata } from "next";
import {
  Poppins, Montserrat, Inter, DM_Sans, Outfit,
} from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PathBot from "@/components/chatbot/PathBot";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduPath AI — AI-Powered Career Guidance for India",
  description: "Brain assessment, stream guidance, entrance exam prep, college recommendations, and career planning — personalised for Indian students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${montserrat.variable} ${inter.variable} ${dmSans.variable} ${outfit.variable}`}>
        <Providers>
          <AppProvider>
            <Header />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
            <PathBot />
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
