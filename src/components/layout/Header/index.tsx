// src/components/layout/Header.tsx
import React from "react";
import CButton from "../../ui/CButton";
import CLink from "../../ui/CLink";
import { useAppSelector } from "../../../redux/hooks";
import Avatar from "../../ui/CAvatar";
import Logging from "./Logging";

const Header: React.FC = () => {
  // const _user = useAppSelector((s) => `${s.userSlice.username} (${s.userSlice.email}) ${s.userSlice.token ? '' : '(not logged in)'}`)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-dark border-b border-dark-gray">
      <CLink
        to="/"
        img={{
          src: "/images/icons/logo.svg",
          alt: "Logo",
        }}
        title="BTCx"
      />
      {/* <>{_user}</> */}
      {/* <CButton
        title="login"
        link='login'
      /> */}
      <Logging />
      {/* <Avatar/> */}
    </header>
  );
};

export default Header;