// src/pages/custom-auth/CustomAuth.tsx
import type { FC } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux";

interface Props {
  to: string;
}

const CustomAuth: FC<Props> = ({ to }) => {
  const userRole = useSelector((state: RootState) => state.role.value);
  const location = useLocation();
  const role = useSelector((state: RootState) => state.role.value);

  // Agar admin bo'lmasa — redirect
  if (!role.includes(userRole)) {
    return <Navigate to={to} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default CustomAuth;
