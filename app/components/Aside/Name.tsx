import Link from "next/link";
import Image from "next/image";
import exp from "constants";

const Name = ({ children }: any) => {
  return (
    <div className="h-19.5">
      <i
        className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"
        sidenav-close="true"
      ></i>
      <Link
        className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"
        href="/"
        passHref
      >
        <Image
          src="/img/logos/rs-nobg.png"
          className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8"
          alt="main_logo"
          width={32}
          height={32}
        />
        <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
          {children}
        </span>
      </Link>
    </div>
  );
};
export default Name;
