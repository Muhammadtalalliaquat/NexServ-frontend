
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 export const metadata: Metadata = {
   title: "NexServ - IT Services Platform",
   description: "NexServ provides reliable digital and technical services.",

   keywords: [
     "NexServ",
     "services website",
     "online services",
     "freelancing platform",
     "IT services",
   ],

   authors: [{ name: "Talal Liaquat" }],

   robots: {
     index: true,
     follow: true,
   },
 };



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
