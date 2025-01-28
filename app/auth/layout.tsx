import React from "react";
import { inter } from "@ui/fonts";

const metadata = {
  title: "RS PKU Muhammadiyah Boja",
  description: "Rumah Sakit PKU Muhammadiyah Boja",
};

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>RS PKU Muhammadiyah Boja</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} antialiased font-sans text-gray-600 m-0 font-sans text-base antialiased font-normal leading-default bg-gray-50 text-slate-500`}
      >
        {children}
      </body>
    </html>
  );
};

export default AuthLayout;
