"use client";

import "./globals.css";

import { Inter } from "next/font/google";
import { LeaderboardProvider } from "@/context/leaderboardContext";
import type { Metadata } from "next";

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
          <LeaderboardProvider>{children}</LeaderboardProvider>
        </div>
      </body>
    </html>
  );
}
