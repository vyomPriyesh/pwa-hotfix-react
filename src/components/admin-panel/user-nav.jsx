import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";

export function UserNav() {
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleThemeChange = (checked) => {
    const theme = checked ? "dark" : "light";
    document.documentElement.classList.toggle("dark", checked);
    localStorage.setItem("theme", theme);
  };

  const isDarkMode = document.documentElement.classList.contains("dark");

  const handleLanguageChange = (value) => {
    localStorage.setItem("language", value);
    i18n.changeLanguage(value);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Sun className="h-5 w-5 text-gray-900 dark:text-gray-100" />
        <Switch
          onCheckedChange={handleThemeChange}
          defaultChecked={isDarkMode}
        />
        <Moon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
      </div>

      <Select onValueChange={handleLanguageChange} defaultValue={i18n.language}>
  <SelectTrigger className="w-[120px]">
    <SelectValue placeholder="Language" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="en">{t("lang.english")}</SelectItem>
    <SelectItem value="hi">{t("lang.hindi")}</SelectItem>
    <SelectItem value="gu">{t("lang.gujarati")}</SelectItem>
  </SelectContent>
</Select>
    </>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" className="relative h-8 w-8 rounded-full">
    //       <Avatar className="h-8 w-8">
    //         <AvatarImage src="#" alt="Avatar" />
    //         <AvatarFallback className="bg-transparent">JD</AvatarFallback>
    //       </Avatar>
    //     </Button>
    //   </DropdownMenuTrigger>

    //   <DropdownMenuContent className="w-56" align="end" forceMount>
    //     <DropdownMenuLabel className="font-normal">
    //       <div className="flex flex-col space-y-1">
    //         <p className="text-sm font-medium leading-none">Admin</p>
    //         <p className="text-xs leading-none text-muted-foreground">
    //           admin@example.com
    //         </p>
    //       </div>
    //     </DropdownMenuLabel>
    //     <DropdownMenuSeparator />

    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem
    //       className="hover:cursor-pointer"
    //       onClick={() => handleLogout()}
    //     >
    //       <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
    //       Logout
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
