"use client";

import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { RegionProvider } from "@/context/regionContext";

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
        <div className="min-h-screen max-w-5xl m-auto mt-5">
          <RegionProvider>{children}</RegionProvider>
        </div>
      </body>
    </html>
  );
}
