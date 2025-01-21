"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LogoutBtnProps {
  children: ReactNode;
}

const LogoutBtn = ({ children }: LogoutBtnProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/auth/signin");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="block px-0 py-2 text-sm font-semibold transition-all ease-nav-brand text-slate-500"
    >
      {children}
    </button>
  );
};

export default LogoutBtn;
