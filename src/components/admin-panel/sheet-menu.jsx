import React from "react";
import { MenuIcon, PanelsTopLeft } from "lucide-react";

import { Button } from "../ui/button";

import { Menu } from "./menu";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { AppImages } from "../../common/ImagePath";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <a href="/" className="flex items-center gap-2 mt-5">
              <div className="w-40">
                <img
                  src={AppImages.logoIconDark}
                  alt="logo"
                  className="block dark:hidden"
                />
                <img
                  src={AppImages.logoIcon}
                  alt="logoDark"
                  className="hidden dark:block"
                />
              </div>
            </a>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
