import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import ConditionalNavbar from "@/components/ConditionalNavbar";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "MoFarms",
  description: "We sell premium livestock for pets and Meats. We ensure ethicnal and sustainable farming practices for the highest quality of our products.",
  openGraph: {
    title: "MoFarms",
    description: "We sell premium livestock for pets and Meats. We ensure ethicnal and sustainable farming practices for the highest quality of our products.",
    images: ["/images/pea.jpg"], 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable} font-body antialiased bg-neutral-950`}
      >
        <ConditionalNavbar />
        {children}
        <Footer/>
         <FloatingContact />
      </body>
    </html>
  );
}
