import { SquareUserIcon } from "lucide-react";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export function getMenuList(pathname) {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "dashboard",
          active: pathname === "/",
          icon: MdOutlineSpaceDashboard,
          submenus: [],
        },
        {
          href: "/users",
          label: "users",
          active: pathname === "/users",
          icon: SquareUserIcon,
          submenus: [],
        },
      ],
    },
  ];
}
