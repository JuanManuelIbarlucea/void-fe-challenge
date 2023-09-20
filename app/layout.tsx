"use client";

import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { RegionProvider } from "@/context/regionContext";
import Nav from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FE Challenge Void.gg",
  description: "FE Challenge Void.gg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex">
          <Nav />
          <div className="min-h-screen max-w-5xl mx-auto my-10 p-5">
            <RegionProvider>{children}</RegionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
