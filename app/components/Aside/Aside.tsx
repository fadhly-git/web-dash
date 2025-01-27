"use client";
import Name from "./Name";
import ComHome from "./ComHome";
import Table from "./Table";
import Profile from "./Profile";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Aside: React.FC = () => {
  const pathname = usePathname();
  const [lastSegment, setLastSegment] = useState("");
  const [masterPath, setMasterPath] = useState("/master");
  useEffect(() => {
    if (pathname) {
      const segments = pathname.split("/");
      setLastSegment(segments[segments.length - 1] || "master");
      if (lastSegment == "master") {
        setLastSegment("Dashboard");
      } else if (lastSegment == "tabeldokter" || lastSegment == "tabelstatus") {
        setLastSegment("Tabel");
      } else if (lastSegment == "Users") {
        setLastSegment("Users");
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname) {
      setMasterPath(
        pathname.includes("master") ? `/${pathname.split("/")[1]}` : "/master"
      );
    }
  }, [pathname]);

  return (
    <aside className="max-w-62.5 ease-nav-brand z-10 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent">
      <Name>RS PKU Boja</Name>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      <div className="items-center block w-auto max-h-screen h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <li className="mt-0.5 w-full">
            <ComHome segment={lastSegment}>Home</ComHome>
          </li>

          <li className="mt-0.5 w-full">
            <Table segment={pathname} />
          </li>
          <li className="mt-0.5 w-full">
            <Profile segment={pathname} />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
