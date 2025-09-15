// import { Avatar } from "antd";
// import React from "react";
// import { ReloadOutlined } from "@ant-design/icons";
// import { useCheckTokenQuery } from "../../redux/api/auth";
// import FullScreen from "./FullScreen";

// const DashboardHeader = () => {
//   const { data } = useCheckTokenQuery(undefined);

//   return (
//     <div className="w-full h-[60px] border-b sticky top-0 left-0 z-50 bg-sidebar text-text border-border px-4 flex items-center justify-between">
//       <div className="flex items-center gap-2 ">
//         <Avatar>{data?.admin?.first_name?.charAt(0)}</Avatar>
//         <h2>{data?.admin?.first_name}</h2>
//       </div>
//       <div className="flex gap-2">
//         <FullScreen />
//         <button
//           className="cursor-pointer  size-8 rounded-full hover:bg-bg text-text-muted"
//           onClick={() => window.location.reload()}
//         >
//           <ReloadOutlined />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default React.memo(DashboardHeader);


import { Avatar } from "antd";
import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { useCheckTokenQuery } from "../../redux/api/auth";
import FullScreen from "./FullScreen";

const DashboardHeader: React.FC = () => {
  const { data } = useCheckTokenQuery(undefined);

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Avatar className="bg-gray-100 text-gray-700">
          {data?.admin?.first_name?.charAt(0) || "?"}
        </Avatar>
        <h2 className="text-base font-medium text-gray-800">
          {data?.admin?.first_name || "Foydalanuvchi"}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <FullScreen />
        <button
          className="size-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => window.location.reload()}
        >
          <ReloadOutlined className="text-base" />
        </button>
      </div>
    </header>
  );
};

export default React.memo(DashboardHeader);