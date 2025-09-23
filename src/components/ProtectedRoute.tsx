import React from "react";
import { useAppSelector } from "../features/auth/hooks";

interface Props {
  requiredToken?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ requiredToken = true, children }) => {
  const token = useAppSelector((s) => s.auth.token);
  if (requiredToken && !token) {
    return <div style={{ color: "red" }}>Access denied. No token.</div>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
