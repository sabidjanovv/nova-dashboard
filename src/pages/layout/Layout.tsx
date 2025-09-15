import React, { useCallback, useEffect } from "react";
import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import { useCheckTokenQuery } from "../../redux/api/auth";
import { setRole } from "../../redux/features/role.slice";
import { logout } from "../../redux/features/auth.slice";
import { Loading } from "../../utils";
import DashboardHeader from "../../components/header/DashboardHeader";
import DashboardNavigation from "../../components/bottom-navigation/DashboardNavigation";
import { Toaster } from "react-hot-toast";
import type { RootState } from "../../redux";
import { Role } from "../../constant";

const Layout = () => {
  const dispatch = useDispatch();
  const roleState = useSelector((state: RootState) => state.role.value);
  const [sidebarShow, setSidebarShow] = React.useState(false);
  const token = useSelector((state: RootState) => state.auth.access_token);

  const { data, isLoading, error } = useCheckTokenQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (data?.user?.role) {
      dispatch(setRole(data.user.role));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error && "status" in error) {
      const status = error.status as number;
      if ([400, 401, 403].includes(status)) {
        dispatch(logout());
      }
    }
  }, [error, dispatch]);

  const handleSidebarOpen = useCallback(() => setSidebarShow(true), []);
  const handleSidebarClose = useCallback(() => setSidebarShow(false), []);

  const isAdminOrOwner =
    roleState === Role.ADMIN || roleState === Role.SUPERADMIN;

  return isLoading ? (
    <Loading />
  ) : (
    <div className={isAdminOrOwner ? "flex bg-bg min-h-screen" : "bg-bg"}>
      {isAdminOrOwner ? (
        <Sidebar open={sidebarShow} onClose={handleSidebarClose} />
      ) : (
        <Header />
      )}
      <main
        className={
          isAdminOrOwner
            ? "flex-1 pb-[60px]"
            : "container mx-auto min-h-[80vh] pb-[60px]"
        }
      >
        {isAdminOrOwner && <DashboardHeader />}
        <Outlet />
      </main>
      {isAdminOrOwner ? (
        <DashboardNavigation onOpen={handleSidebarOpen} />
      ) : null}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
    </div>
  );
};

export default React.memo(Layout);
