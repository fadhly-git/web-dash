"use client";
import Link from "next/link";
import React, { useState } from "react";

const sidebarColor = (colorFrom: string, colorTo: string) => {
  const sidebar = document.querySelector("aside");
  if (sidebar) {
    sidebar.style.backgroundImage = `linear-gradient(to top left, var(--${colorFrom}), var(--${colorTo}))`;
  }
};

const FixedPlugin: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePlugin = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed-plugin">
      <button
        className="fixed-plugin-button bottom-7.5 right-7.5 text-xl z-990 shadow-soft-lg rounded-circle fixed cursor-pointer bg-white px-4 py-2 text-slate-700"
        onClick={togglePlugin}
      >
        <i className="py-2 pointer-events-none fa fa-cog"></i>
      </button>
      <div
        className={`fixed-plugin-card z-sticky shadow-soft-3xl w-90 ease-soft ${
          isOpen ? "right-0" : "-right-90"
        } fixed top-0 left-auto flex h-full min-w-0 flex-col break-words rounded-none border-0 bg-white bg-clip-border px-2.5 duration-200`}
      >
        <div className="px-6 pt-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
          <div className="float-left">
            <h5 className="mt-4 mb-0">My Apps Configurator</h5>
            <p>See our dashboard options.</p>
          </div>
          <div className="float-right mt-6">
            <button
              className="fixed-plugin-close-button inline-block p-0 mb-4 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro ease-soft-in tracking-tight-soft bg-150 bg-x-25 active:opacity-85 text-slate-700"
              onClick={togglePlugin}
            >
              <i className="fa fa-close"></i>
            </button>
          </div>
        </div>
        <hr className="h-px mx-0 my-1 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
        <div className="flex-auto p-6 pt-0 sm:pt-4">
          <div>
            <h6 className="mb-0">Sidebar Colors</h6>
          </div>
          <Link href="javascript:void(0)">
            <div className="my-2 text-left" sidenav-colors="true">
              <span
                className="text-xs rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-purple-700 to-pink-500 relative inline-block cursor-pointer whitespace-nowrap border border-solid border-slate-700 text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700"
                data-color-from="purple-700"
                data-color-to="pink-500"
                onClick={() => sidebarColor("purple-700", "pink-500")}
              ></span>
              <span
                className="text-xs rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-gray-900 to-slate-800 relative inline-block cursor-pointer whitespace-nowrap border border-solid border-white text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700"
                data-color-from="gray-900"
                data-color-to="slate-800"
                onClick={() => sidebarColor("gray-900", "slate-800")}
              ></span>
              <span
                className="text-xs rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-blue-600 to-cyan-400 relative inline-block cursor-pointer whitespace-nowrap border border-solid border-white text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700"
                data-color-from="blue-600"
                data-color-to="cyan-400"
                onClick={() => sidebarColor("blue-600", "cyan-400")}
              ></span>
              <span
                className="text-xs rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-green-600 to-lime-400 relative inline-block cursor-pointer whitespace-nowrap border border-solid border-white text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700"
                data-color-from="green-600"
                data-color-to="lime-400"
                onClick={() => sidebarColor("green-600", "lime-400")}
              ></span>
              <span
                className="text-xs rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-red-500 to-yellow-400 relative inline-block cursor-pointer whitespace-nowrap border border-solid border-white text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700"
                data-color-from="red-500"
                data-color-to="yellow-400"
                onClick={() => sidebarColor("red-500", "yellow-400")}
              ></span>
              <span
                className="text-xs rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-red-600 to-rose-400 relative inline-block cursor-pointer whitespace-nowrap border border-solid border-white text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700"
                data-color-from="red-600"
                data-color-to="rose-400"
                onClick={() => sidebarColor("red-600", "rose-400")}
              ></span>
            </div>
          </Link>
          <div className="mt-4">
            <h6 className="mb-0">Sidenav Type</h6>
            <p className="text-sm leading-normal">
              Choose between 2 different sidenav types.
            </p>
          </div>
          <div className="flex">
            <button
              className="transparent-style-btn inline-block w-full px-4 py-3 mb-2 text-xs font-bold text-center text-white uppercase align-middle transition-all border border-transparent border-solid rounded-lg cursor-pointer xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-purple-700 to-pink-500 bg-fuchsia-500 hover:border-fuchsia-500"
              data-class="bg-transparent"
              onClick={() => sidenavType("bg-transparent")}
            >
              Transparent
            </button>
            <button
              className="white-style-btn inline-block w-full px-4 py-3 mb-2 ml-2 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg cursor-pointer xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 border-fuchsia-500 bg-none text-fuchsia-500 hover:border-fuchsia-500"
              data-class="bg-white"
              onClick={() => sidenavType("bg-white")}
            >
              White
            </button>
          </div>
          <p className="block mt-2 text-sm leading-normal xl:hidden">
            You can change the sidenav type just on desktop view.
          </p>
          <div className="mt-4">
            <h6 className="mb-0">Navbar Fixed</h6>
          </div>
          <div className="min-h-6 mb-0.5 block pl-0">
            <input
              className="navbarFixed rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left mt-1 ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
              type="checkbox"
            />
          </div>
          <hr className="h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent sm:my-6" />
        </div>
      </div>
    </div>
  );
};

const sidenavType = (type: string) => {
  console.log(`Sidenav type changed to ${type}`);
};

export default FixedPlugin;
