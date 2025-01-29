import React from "react";
import Link from "next/link";

interface LinkProps {
  handleFullscreen?: () => void;
}

const NavbarHome: React.FC<LinkProps> = ({ handleFullscreen }) => {
  return (
    <div className="relative group items-center">
      <nav className="bg-[#00008B] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="text-white text-lg font-bold" href="/">
            RS PKU Muhammadiyah Boja
          </Link>
        </div>
      </nav>
      <nav className="absolute top-full left-0 w-full bg-[#00008B] p-4 hidden group-hover:block">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex">
            <li>
              <Link href="/master" className="text-gray-300 hover:text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={handleFullscreen}
                className="ml-5 text-gray-300 hover:text-white"
              >
                Fullscreen
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavbarHome;
