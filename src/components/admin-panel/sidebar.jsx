import React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Menu } from "./menu";
import { useSidebarToggle } from "../../hooks/use-sidebar-toggle";
import { useStore } from "zustand";
import { AppImages } from "../../common/ImagePath";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const { pathname } = useLocation();
  const { t } = useTranslation("common");

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-white dark:bg-zinc-900",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <div className="relative h-full flex flex-col py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        {/* Logo Section */}
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <a href="/" className="flex items-center gap-2">
            <div className="w-48">
              {/* Light Logo */}
              <img
                src={AppImages.logoIconDark}
                alt="logo"
                className={cn(
                  sidebar?.isOpen === false
                    ? "-translate-x-96 opacity-0 hidden !w-full"
                    : "translate-x-0 opacity-100",
                  "block dark:hidden"
                )}
              />
              {/* Dark Logo */}
              <img
                src={AppImages.logoIcon}
                alt="logoDark"
                className={cn(
                  sidebar?.isOpen === false
                    ? "-translate-x-96 opacity-0 hidden !w-full"
                    : "translate-x-0 opacity-100",
                  "hidden dark:block"
                )}
              />
            </div>
          </a>
        </Button>

        {/* Menu Component with translation */}
        <Menu isOpen={sidebar?.isOpen} pathname={pathname} t={t} />
      </div>
    </aside>
  );
}
