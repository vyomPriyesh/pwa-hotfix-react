import React, { useState } from "react";
import { DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { FaCalendarAlt } from "react-icons/fa";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Checkbox } from "../../components/ui/checkbox";
import { ScrollArea } from "../../components/ui/scroll-area";

// ✅ Reusable helper for date formatting
function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ✅ Check if date is valid
function isValidDate(date) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

const EditUser = ({ user, isOpen, setIsOpen }) => {
  const { t } = useTranslation("common");

  // Date Picker Component
  const DatePicker = () => {
    const today = new Date();

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState(date);
    const [value, setValue] = useState(formatDate(date));

    return (
      <div className="flex flex-col gap-3">
        <div className="relative flex gap-2">
          <Input
            id="date"
            value={value}
            placeholder="June 01, 2025"
            className="bg-background pr-10"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setValue(e.target.value);
              if (isValidDate(date)) {
                setDate(date);
                setMonth(date);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
          />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2 !p-0"
              >
                <FaCalendarAlt className="size-4 !text-primary/70" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setValue(formatDate(selectedDate));
                  setOpen(false);
                }}
                captionLayout="dropdown"
                fromYear={1970}
                toYear={2030}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  };

  // Role Dialog
  const RoleDialog = () => {
    const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");

    return (
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : <>{t("selectRolePlaceholder")}</>}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 lg:w-[367px]">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    )
  }

  // Works Dialog
  const WorksDialog = () => {
    const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");

    return (
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : <>{t("selectWorkTypePlaceholder")}</>}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 lg:w-[367px]" align="start">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    )
  }

  return (
    <CommonDialog
      isOpen={isOpen}
      onClose={() => setIsOpen("")}
      size="lg"
      title={t("users.editBadge")}
      footer={
        <div className="flex gap-2">
          <CommonButton variant="outline" onClick={() => setIsOpen("")}>
            {t("cancel")}
          </CommonButton>
          <CommonButton onClick={() => setIsOpen("")}>
            {t("submit")}
          </CommonButton>
        </div>
      }
    >
      <ScrollArea className="h-[calc(100dvh-250px)] -mr-2 pr-2">
      <div className="grid lg:grid-cols-2 gap-4">
        <div  className="grid gap-3 col-span-2 mx-auto text-center">
          <Label>{t("users.image")}</Label>
          <Label htmlFor="profile" className="h-16 w-16 lg:h-20 lg:w-20 xxl:h-24 xxl:w-24 overflow-hidden border border-border rounded-md cursor-pointer flex items-center justify-center">
            {/* <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" alt="Profile" className="w-full h-full object-cover bg-center" /> */}
            <span className="h3-bold">PM</span>
          </Label>
          <input type="image" className="hidden" />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.name")}</Label>
          <Input type="text" placeholder={t("usernamePlaceholder")} />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.email")}</Label>
          <Input type="text" placeholder={t("emailPlaceholder")} />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.mobile")}</Label>
          <Input type="text" placeholder={t("mobilePlaceholder")} />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.dob")}</Label>
          <DatePicker />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.password")}</Label>
          <Input type="text" placeholder={t("passwordPlaceholder")} />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.confirmPassword")}</Label>
          <Input type="text" placeholder={t("confirmPasswordPlaceholder")} />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.role")}</Label>
          <RoleDialog />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.workType")}</Label>
          <WorksDialog />
        </div>
        <div className="flex items-center gap-2 col-span-2 h-10 border border-border rounded-md px-3">
          <Checkbox id="one" />
          <Label className="cursor-pointer" htmlFor="one">{t("users.hideChallange")}</Label>
        </div>
        <div className="flex items-center gap-2 col-span-2 h-10 border border-border rounded-md px-3">
          <Checkbox id="two" />
          <Label className="cursor-pointer" htmlFor="two">{t("users.hideChallange")}</Label>
        </div>
        <div className="flex items-center gap-2 col-span-2 h-10 border border-border rounded-md px-3">
          <Checkbox id="three" />
          <Label className="cursor-pointer" htmlFor="three">{t("users.hideChallange")}</Label>
        </div>
        <div className="grid gap-2">
          <Label>{t("users.fromTime")}</Label>
          <Input type="text" placeholder="HH:MM:SS" />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.toTime")}</Label>
          <Input type="text" placeholder="HH:MM:SS" />
        </div>
      </div>
      </ScrollArea>
    </CommonDialog>
  );
};

export default EditUser;

// Date Picker
