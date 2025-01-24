import React from "react";
import Link from "next/link";

const NavbarHome: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          RS PKU Muhammadiyah Boja
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/master" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarHome;
