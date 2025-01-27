import React, { ReactNode } from "react";
import Aside from "../Aside/Aside";
import Navbar from "../navbar/Navbar";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Aside />
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        <Navbar />
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex flex-wrap -mx-3"> {children} </div>
        </div>
      </main>
    </>
  );
};

export default DefaultLayout;
