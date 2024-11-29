import type { Metadata } from "next";
import localFont from "next/font/local";
import {Hind_Vadodara} from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const hindVadodara = Hind_Vadodara({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Générateur de palettes de couleurs",
  description: "Parce qu'une App qui claque commence par le choix des bonnes couleurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hindVadodara.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
