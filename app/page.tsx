"use client";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to My Next.js App</h1>
      <p>This is the landing page of your new Next.js application.</p>
      <button onClick={() => alert("Button clicked!")}>Get Started</button>
    </div>
  );
};

export default LandingPage;
