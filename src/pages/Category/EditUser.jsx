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

  return (
    <CommonDialog
      isOpen={isOpen}
      onClose={() => setIsOpen("")}
      size="sm"
      title={t("users.editBadge")}
      footer={
        <div className="flex gap-2">
          <CommonButton variant="outline" onClick={() => setIsOpen("")}>
            {t("cancel")}
          </CommonButton>
          <CommonButton onClick={() => setIsOpen("")}>
            {t("Create")}
          </CommonButton>
        </div>
      }
    >
      <div className="grid gap-4">
       
        <div className="grid gap-2">
          <Label>{t("users.name")}</Label>
          <Input type="text" placeholder={t("usernamePlaceholder")} />
        </div>
      </div>
    </CommonDialog>
  );
};

export default EditUser;

// Date Picker
