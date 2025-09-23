// src/components/layout/Layout.tsx
import React from "react";
import Header from "./Header";
import Sidebar from "./sidebar";
import MobileNav from "./MobileNav";
 import StarsSimulation from "../ui/StarsSimulation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Header />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-black flex-1 md:ml-60 mt-16 ">
          <StarsSimulation />
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
};

export default Layout;