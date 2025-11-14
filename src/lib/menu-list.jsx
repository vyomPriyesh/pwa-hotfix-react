import { Box, Handshake, LayoutList, Newspaper, User } from "lucide-react";
import { MdDraw, MdOutlinePendingActions, MdOutlineSpaceDashboard } from "react-icons/md";
import { RiFolderReceivedLine } from "react-icons/ri";

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
          href: "/design",
          label: "design",
          active: pathname === "/deign",
          icon: MdDraw,
          submenus: [],
        },
         {
          href: "/challan",
          label: "chalan",
          active: pathname === "/challan",
          icon: Newspaper,
          submenus: [],
        },
         {
          href: "/pending",
          label: "pending",
          active: pathname === "/pending",
          icon: MdOutlinePendingActions,
          submenus: [],
        },
         {
          href: "/received-mall",
          label: "receivedMall",
          active: pathname === "/received-mall",
          icon: RiFolderReceivedLine,
          submenus: [],
        },
        {
          href: "",
          label: "master",
          active: pathname.includes("/master"),
          icon: Box,
          submenus: [
            {
              href: "/master/user",
              label: "user",
              active: pathname === "/master/user",
              icon: User,
            },
            {
              href: "/master/party",
              label: "party",
              active: pathname === "/master/party",
              icon: Handshake,
            },
            {
              href: "/master/category",
              label: "category",
              active: pathname === "/master/category",
              icon: LayoutList,
            },
          ],
        },
       
      ],
    },
  ];
}
