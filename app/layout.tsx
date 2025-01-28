"use client";
import type { Metadata } from "next";
import { useEffect } from "react";
import "./globals.css";
import "../assets/css/nucleo-icons.css";
import "../assets/css/nucleo-svg.css";
import "../assets/css/soft-ui-dashboard-tailwind.css";
import Head from "next/head";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { inter } from "@ui/fonts";

const metadata = {
  title: "RS PKU Muhammadiyah Boja",
  description: "Rumah Sakit PKU Muhammadiyah Boja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("DOMContentLoaded", function () {
        const elements = document.querySelectorAll(
          ".overflow-auto, .overflow-y-auto, .overflow-x-auto"
        );
        elements.forEach((element) => {
          new PerfectScrollbar(element);
        });
      });
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>RS PKU Muhammadiyah Boja</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Rumah Sakit PKU Muhammadiyah Boja" />
      </Head>
      <body
        className={`${inter.className} antialiased font-sans text-gray-600`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
