import React from "react";
import type { FC } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import {
  HomeOutlined,
  AppstoreAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface Props {
  onOpen: () => void;
}

const DashboardNavigation: FC<Props> = ({ onOpen }) => {
  return (
    <>
      <div className="dashboard-navigation max-w-[360px] max-[500px]:max-w-[100%] flex p-1 justify-around gap-1 w-full h-[60px] max-[500px]:h-[50px] bg-slate-200/50 dark:bg-slate-800 backdrop-blur-[4px] fixed bottom-3 max-[500px]:bottom-0 left-[50%] translate-x-[-50%] rounded-[10px] max-[500px]:rounded-b-[0] z-50">
        <NavLink
          end={false}
          className={`bottom-navigation text-text-muted flex-1 flex items-center justify-center text-[20px]`}
          to={"/"}
        >
          <HomeOutlined />
        </NavLink>
        <button
          onClick={onOpen}
          className={`bottom-navigation text-text-muted flex-1 flex items-center justify-center text-[20px] cursor-pointer`}
        >
          <AppstoreAddOutlined />
        </button>
        <NavLink
          className={`bottom-navigation text-text-muted flex-1 flex items-center justify-center text-[20px]`}
          to={"/profile"}
        >
          <UserOutlined />
        </NavLink>
      </div>
    </>
  );
};

export default React.memo(DashboardNavigation);
