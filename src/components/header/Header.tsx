import React from "react";
import { Link } from "react-router-dom";
import { ReloadOutlined } from "@ant-design/icons";
import FullScreen from "./FullScreen";

const Header = () => {
  return (
    <header className="bg-sidebar border-b border-border sticky top-0 left-0 z-40">
      <div className="container mx-auto">
        <nav className="h-[60px] max-[500px]:h-[50px] flex items-center justify-between">
          <Link to={"/EMPLOYEE"} className=" font-bold">
            {/* <img className="w-[50px]" src={logo} alt="logo" /> */}
            <span className="font-bold text-xl">Dashboard</span>
          </Link>
          <div className="flex gap-2">
            <FullScreen />
            <button
              className="cursor-pointer hover:bg-bg size-8 rounded-full  text-text-muted"
              onClick={() => window.location.reload()}
            >
              <ReloadOutlined />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Header);
