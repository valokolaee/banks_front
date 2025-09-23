// src/components/layout/MobileNav.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark border-t border-dark-gray flex justify-around items-center h-16 z-50">
      {[
        { path: "/", label: "Home", icon: "/images/icons_user/home.svg" },
        { path: "/account", label: "Account", icon: "/images/icons_user/account.svg" },
        { path: "/wallet", label: "Wallet", icon: "/images/icons_user/wallet.svg" },
        { path: "/pools", label: "Pools", icon: "/images/icons_user/pools.svg" },
        { path: "/banks", label: "Banks", icon: "/images/icons_user/banks.svg" }
      ].map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center text-xs transition-colors ${
            isActive(item.path) ? 'text-primary' : 'text-white-inverse/70'
          }`}
        >
          <img src={item.icon} alt={item.label} className="w-6 h-6 mb-1" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileNav;