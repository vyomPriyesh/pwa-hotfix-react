import { Box, Handshake, LayoutList, User } from "lucide-react";
import { MdDraw, MdOutlineSpaceDashboard } from "react-icons/md";
import { SiLibreofficedraw } from "react-icons/si";

export function getMenuList(pathname) {
  return [
    // {
    //   groupLabel: "",
    //   menus: [
    //     {
    //       href: "/",
    //       label: "dashboard",
    //       active: pathname === "/",
    //       icon: MdOutlineSpaceDashboard,
    //       submenus: [],
    //     },
    //     {
    //       href: "/users",
    //       label: "users",
    //       active: pathname === "/users",
    //       icon: SquareUserIcon,
    //       submenus: [],
    //     },
    //   ],
    // },
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
        {
          href: "/design",
          label: "design",
          active: pathname === "/deign",
          icon: MdDraw,
          submenus: [],
        },
      ],
    },
  ];
}
