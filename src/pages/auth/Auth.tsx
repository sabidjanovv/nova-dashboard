import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../redux";

const Auth = () => {
  const token = useSelector((state: RootState) => state.auth.access_token);
  return token ? <Outlet /> : <Navigate replace to={"/login"} />;
};

export default React.memo(Auth);
