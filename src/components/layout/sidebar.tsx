// src/components/layout/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Home", icon: "/images/icons_user/home.svg" },
    { path: "/account", label: "Account", icon: "/images/icons_user/account.svg" },
    { path: "/wallet", label: "Wallet", icon: "/images/icons_user/wallet.svg" },
    { path: "/pools", label: "Pools", icon: "/images/icons_user/pools.svg" },
    { path: "/banks", label: "Banks", icon: "/images/icons_user/banks.svg" },
    // { path: "/monitoring", label: "Monitoring", icon: "/images/icons_user/banks.svg" },
  ];

  return (
    <aside className="w-60 bg-dark-gray border-r border-dark fixed left-0 top-16 bottom-0   z-40 hidden md:block">
      <nav className="p-4 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors
              ${location.pathname === item.path 
                ? 'text-primary bg-dark' 
                : 'text-white-inverse hover:text-primary hover:bg-dark'
              }`}
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;