import React from "react";
import Name from "./Name";
import ComHome from "./ComHome";
import Show from "./Show";

const Aside: React.FC = () => {
  return (
    <aside className="max-w-62.5 ease-nav-brand z-10 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent">
      <Name>My Apps</Name>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      <div className="items-center block w-auto max-h-screen h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <li className="mt-0.5 w-full">
            <ComHome>Home</ComHome>
          </li>

          <li className="mt-0.5 w-full">
            <Show>Show</Show>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
