// import React from "react";
// import { NavLink } from "react-router-dom";
// import { Button, Popconfirm } from "antd";
// import { MdLogout } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/features/auth.slice";
// import { SIDEBAR_LINKS } from "../../static";
// import { Role } from "../../constant";
// import type { RootState } from "../../redux";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<Props> = ({ open, onClose }) => {
//   const dispatch = useDispatch();
//   const role = useSelector((state: RootState) => state.role.value);

//   const handleLogout = () => {
//     dispatch(logout());
//     onClose();
//   };

//   const restrictedLinks = ["/admins"];

//   return (
//     <>
//       {open && (
//         <div
//           onClick={onClose}
//           className="sidebar-overlay fixed top-0 left-0 w-screen h-screen bg-black opacity-10 z-[51]"
//         ></div>
//       )}
//       <div
//         className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-sm z-[52] transform transition-transform duration-300 ${
//           open ? "show" : ""
//         } sidebar w-[250px] h-screen overflow-auto flex flex-col text-primary p-4 bg-sidebar border-r border-border sticky top-0 left-0  z-[52]`}
//       >
//         <h1 className="text-xl font-medium text-gray-800">3D Dizayn</h1>

//         <nav className="flex-1 space-y-1">
//           {SIDEBAR_LINKS.filter(
//             (link) =>
//               role === Role.SUPERADMIN || !restrictedLinks.includes(link.path)
//           ).map((link) => (
//             <NavLink
//               key={link.id}
//               to={link.path}
//               end
//               onClick={onClose}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium transition-colors ${
//                   isActive
//                     ? "bg-gray-900 text-white"
//                     : "text-gray-600 hover:bg-gray-50"
//                 }`
//               }
//             >
//               {link.icon}
//               {link.title}
//             </NavLink>
//           ))}
//         </nav>

//         <Popconfirm
//           title="Tizimdan chiqish"
//           description="Rostdan chiqmoqchimisiz?"
//           onConfirm={handleLogout}
//           okText="Ha"
//           cancelText="Yo‘q"
//         >
//           <Button
//             type="text"
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
//           >
//             <MdLogout size={18} />
//             Chiqish
//           </Button>
//         </Popconfirm>
//       </div>
//     </>
//   );
// };

// export default React.memo(Sidebar);

import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Popconfirm } from "antd";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth.slice";
import { SIDEBAR_LINKS } from "../../static";
import { Role } from "../../constant";
import type { RootState } from "../../redux";

interface Props {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.role.value);

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  const restrictedLinks = ["/admins"];

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/10 z-[51]" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-[52] transform transition-transform duration-300 ${
          open ? "show" : ""
        } sidebar w-[250px] h-screen overflow-auto flex flex-col text-primary p-4 bg-sidebar border-r border-border sticky top-0 left-0  z-[52]`}
      >
        <h1 className="text-xl font-medium text-gray-800">3D Dizayn</h1>

        <nav className="flex-1 space-y-1">
          {SIDEBAR_LINKS.filter(
            (link) =>
              role === Role.SUPERADMIN || !restrictedLinks.includes(link.path)
          ).map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {link.icon}
              {link.title}
            </NavLink>
          ))}
        </nav>

        <Popconfirm
          title="Tizimdan chiqish"
          description="Rostdan chiqmoqchimisiz?"
          onConfirm={handleLogout}
          okText="Ha"
          cancelText="Yo‘q"
        >
          <Button
            type="text"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm"
          >
            <MdLogout size={18} />
            Chiqish
          </Button>
        </Popconfirm>
      </aside>
    </>
  );
};

export default React.memo(Sidebar);