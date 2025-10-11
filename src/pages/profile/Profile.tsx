// import React, { useCallback, useState } from "react";
// import { Tag, Skeleton, Card } from "antd";
// import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import { useCheckTokenQuery } from "../../redux/api/auth";
// import AdminPopup from "../../components/admin-popup/AdminPopup";

// const Profile: React.FC = () => {
//   const { data, isLoading, isError } = useCheckTokenQuery();
//   const [isEditing, setIsEditing] = useState(false);
//   // const dispatch = useDispatch();

//   const handleClose = useCallback((isBack?: boolean) => {
//     setIsEditing(false);
//     if (!isBack) {
//       window.history.back();
//     }
//   }, []);

//   const user = data?.admin || {};

//   // const handleLogout = () => {
//   //   dispatch(logout());
//   // };

//   return (
//     <div className="p-6">
//       <Card className="rounded-2xl shadow-md">
//         {isLoading ? (
//           <Skeleton active />
//         ) : isError ? (
//           <></>
//         ) : (
//           <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
//             {/* Chap tomonda icon va user info */}
//             <div className="flex w-full md:items-center flex-row-reverse md:flex-row gap-4">
//               <div>
//                 <MdOutlineAdminPanelSettings className="text-7xl text-gray-400" />
//               </div>
//               <div className="w-full">
//                 <h3 className="text-2xl font-semibold">
//                   {user.first_name} {user.last_name}
//                 </h3>
//                 <p className="text-gray-500 mt-1">@{user.username}</p>
//                 <div className="mt-2">
//                   <Tag color={user.is_active ? "green" : "red"}>
//                     {user.is_active ? "Faol" : "Faol emas"}
//                   </Tag>
//                   <Tag color="blue" className="ml-2">
//                     {user.role}
//                   </Tag>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </Card>

//       <AdminPopup
//         open={isEditing}
//         onClose={handleClose}
//         prevData={user}
//         currentRole={user?.role}
//       />
//     </div>
//   );
// };

// export default React.memo(Profile);
import React, { useState } from "react";
import { Tag, Skeleton, Card, Button } from "antd";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useCheckTokenQuery } from "../../redux/api/auth";
import AdminSelfModal from "../../components/admin-popup/AdminSelfModal";
import AdminModal from "../admins/AdminModal";

const Profile: React.FC = () => {
  const { data, isLoading, isError, refetch } = useCheckTokenQuery();
  const [isEditing, setIsEditing] = useState(false);

  // const handleClose = useCallback(() => {
  //   setIsEditing(false);
  // }, []);

  const user = data?.admin || {};

  if (isLoading) {
    return (
      <div className="p-6">
        <Card className="rounded-2xl shadow-md">
          <Skeleton active />
        </Card>
      </div>
    );
  }

  if (isError) {
    return <div className="p-6 text-red-500">Xatolik yuz berdi.</div>;
  }

  const isSuperAdmin = user.role === "superadmin";

  return (
    <div className="p-6">
      <Card className="rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Chap tomonda icon va user info */}
          <div className="flex w-full md:items-center flex-row-reverse md:flex-row gap-4">
            <div>
              <MdOutlineAdminPanelSettings className="text-7xl text-gray-400" />
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-semibold">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-gray-500 mt-1">@{user.username}</p>
              <div className="mt-2">
                <Tag color={user.is_active ? "green" : "red"}>
                  {user.is_active ? "Faol" : "Faol emas"}
                </Tag>
                <Tag color="blue" className="ml-2">
                  {user.role}
                </Tag>
              </div>
            </div>
          </div>

          {/* Tahrirlash tugmasi */}
          <div>
            <Button
              type="primary"
              onClick={() => setIsEditing(true)}
              className="bg-black"
              style={{ backgroundColor: "black", borderColor: "black" }}
            >
              Tahrirlash
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal — rolga qarab tanlanadi */}
      {isSuperAdmin ? (
        <AdminModal
          open={isEditing}
          setOpen={setIsEditing}
          editData={user}
          refetch={refetch}
        />
      ) : (
        <AdminSelfModal
          open={isEditing}
          setOpen={setIsEditing}
          editData={user}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default React.memo(Profile);
