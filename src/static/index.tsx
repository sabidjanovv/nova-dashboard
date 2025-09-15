import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineCategory, MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { theme } from "antd";

export const themeLight = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#314158",
    colorBgBase: "#ffffff",
    colorTextBase: "#1f2937",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    borderRadius: 4,
    colorBgContainer: "#fff",
  },
};
export const themeDark = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#314158", // --color-primary
    colorBgBase: "#000", // --color-bg
    colorBgContainer: "#1E2939", // --color-card / --color-sidebar
    // colorBgElevated: "#1E2939", // --color-card / --color-sidebar
    colorTextBase: "#FFFFFF", // --color-text
    colorText: "#c8d0df", // --color-text-muted (asosiy matndan tashqari)
    colorSuccess: "#22C55E", // --color-success
    colorWarning: "#EAB308", // --color-warning
    colorError: "#ff4d4f", // --color-danger
    colorBorder: "#2d3646", // --color-border
    // colorSplit: "#3F3F46", // --color-divider
    borderRadius: 4,
  },
};

export const SIDEBAR_LINKS = [
  {
    id: 1,
    path: "/categories",
    title: "Kategoriyalar",
    icon: <MdOutlineCategory className="text-2xl" />, // toifalar uchun kategoriya ikonkasi
  },
  {
    id: 2,
    path: "/collections",
    title: "Kolleksiyalar",
    icon: <MdOutlineCollectionsBookmark className="text-2xl" />, // kolleksiya uchun mos
  },
  {
    id: 3,
    path: "/admins",
    title: "Adminlar",
    icon: <FaUsersCog className="text-2xl" />, // adminlar (foydalanuvchilar sozlamasi)
  },
  {
    id: 4,
    path: "/team",
    title: "Jamoa",
    icon: <RiTeamLine className="text-2xl" />, // jamoa uchun team icon
  },
  {
    id: 5,
    path: "/profile",
    title: "Profil",
    icon: <FaRegCircleUser className="text-2xl" />, // profil
  },
];