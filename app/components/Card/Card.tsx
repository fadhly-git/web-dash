import React from "react";
import Link from "next/link";

const Card = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl px-6 py-6 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border aspect-w-16 aspect-h-9">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                <div className="flex flex-col h-full">
                  <p className="pt-2 mb-1 font-semibold">Built by developers</p>
                  <h5 className="font-bold">Soft UI Dashboard</h5>
                  <p className="mb-12">
                    From colors, cards, typography to complex elements, you will
                    find the full documentation.
                  </p>
                  <Link
                    className="m t-auto mb-0 text-sm font-semibold leading-normal group text-slate-500"
                    href="javascript:;"
                  >
                    Read More
                    <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"></i>
                  </Link>
                </div>
              </div>
              <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
                <div className="h-full bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl">
                  <img
                    src="./img/shapes/waves-white.svg"
                    className="absolute top-0 hidden w-1/2 h-full lg:block"
                    alt="waves"
                  />
                  <div className="relative flex items-center justify-center h-full">
                    <img
                      className="relative z-20 w-full h-full object-cover"
                      src="./img/illustrations/rocket-white.png"
                      alt="rocket"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
