import "./globals.css";
import "../assets/css/nucleo-icons.css";
import "../assets/css/nucleo-svg.css";
import "../assets/css/soft-ui-dashboard-tailwind.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { inter } from "@ui/fonts";

export const metadata = {
  title: "RS PKU Muhammadiyah Boja",
  description: "Selamat datang di website RS PKU Muhammadiyah Boja",
  keywords: ["rs", "pku", "muhammadiyah", "boja"],
  openGraph: {
    title: "RS PKU Muhammadiyah Boja",
    description: "Selamat datang di website RS PKU Muhammadiyah Boja",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased font-sans text-gray-600`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
