"use client";
import React from "react";
import NavbarHome from "./components/navbar/NavbarHome";

const LandingPage: React.FC = () => {
  return (
    <>
      <NavbarHome />
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Welcome to My Next.js App</h1>
        <p>This is the landing page of your new Next.js application.</p>
      </div>
    </>
  );
};

export default LandingPage;
