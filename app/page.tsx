"use client";
import React, { useRef } from "react";
import NavbarHome from "./components/navbar/NavbarHome";
import Card from "./components/Card/Card";

const LandingPage: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleFullscreen = () => {
    if (cardRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        cardRef.current.requestFullscreen();
      }
    }
  };
  return (
    <div ref={cardRef} className="h-screen bg-white" suppressHydrationWarning>
      <NavbarHome handleFullscreen={handleFullscreen} />
      {/* <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Welcome to My Next.js App</h1>
        <p>This is the landing page of your new Next.js application.</p>
      </div> */}
      <Card />
    </div>
  );
};

export default LandingPage;
