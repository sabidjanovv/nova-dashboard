import React, { useCallback, useState } from "react";
import { Tag, Skeleton, Card } from "antd";
// import { FaRegEdit } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import { useDispatch } from "react-redux";
// import TelPopUp from "../../components/tel-pop-up/TelPopUp";
import { useCheckTokenQuery } from "../../redux/api/auth";
// import { logout } from "../../redux/features/auth.slice";
import AdminPopup from "../../components/admin-popup/AdminPopup";
// import HotspotImage from "./HotspotImage";
// import Calculate from "./Calculate";

const Profile: React.FC = () => {
  const { data, isLoading, isError } = useCheckTokenQuery();
  const [isEditing, setIsEditing] = useState(false);
  // const dispatch = useDispatch();

  const handleClose = useCallback((isBack?: boolean) => {
    setIsEditing(false);
    if (!isBack) {
      window.history.back();
    }
  }, []);

  const user = data?.admin || {};

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  return (
    <div className="p-6">
      <Card className="rounded-2xl shadow-md">
        {isLoading ? (
          <Skeleton active />
        ) : isError ? (
          <></>
        ) : (
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

            {/* O‘ng tomonda contact va buttonlar */}
            {/* <div className="flex w-full flex-col items-end gap-2">
              <TelPopUp phoneNumber={user.phone_number} />

              <div className="flex gap-2 mt-2">
                <Button onClick={() => setIsEditing(true)} type="default">
                  <FaRegEdit className="text-lg" />
                  <span className="ml-1">Tahrirlash</span>
                </Button>
                <Popconfirm
                  title="Tizimdan chiqish"
                  description="Chindan ham tizimdan chiqmoqchimisiz?"
                  onConfirm={handleLogout}
                  okText="Ha"
                  cancelText="Yo‘q"
                >
                  <Button type="default" danger>
                    <MdLogout className="text-lg" />
                    <span className="ml-1">Chiqish</span>
                  </Button>
                </Popconfirm>
              </div>
            </div> */}
          </div>
        )}
      </Card>

      {/* <HotspotImage />

      <Calculate /> */}

      <AdminPopup
        open={isEditing}
        onClose={handleClose}
        prevData={user}
        currentRole={user?.role}
      />
    </div>
  );
};

export default React.memo(Profile);
