import { Bookmark, Handshake, LayoutList, SquarePen, Tag, User } from "lucide-react";
import { MdOutlineSpaceDashboard } from "react-icons/md";

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
          label: "Master",
          active: pathname.includes("/master"),
          icon: SquarePen,
          submenus: [
            {
              href: "/master/user",
              label: "User",
              active: pathname === "/master/user",
              icon: User,
            },
            {
              href: "/master/party",
              label: "Party",
              active: pathname === "/master/party",
              icon: Handshake,
            },
            {
              href: "/master/category",
              label: "Category",
              active: pathname === "/master/category",
              icon: LayoutList,
            },
          ],
        },
        {
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: [],
        },
      ],
    },
  ];
}
