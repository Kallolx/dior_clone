import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Prata } from 'next/font/google';

// Load DM Sans font
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// Load Prata font
const prata = Prata({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-prata',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dior - Premium Shopping Experience",
  description: "Shop the latest collections from Dior",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${prata.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
