import React, { useState } from "react";
import { DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { ChevronDownIcon } from "lucide-react";

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}


const EditUser = ({ user, isOpen, setIsOpen }) => {
  const { t } = useTranslation("common");

  const DatePicker = () => {
    const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  };

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
      <div className="grid gap-4">
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
          <Label>{t("users.password")}</Label>
          <Input type="text" placeholder={t()} />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.confirmPassword")}</Label>
          <Input type="text" placeholder={t()} />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.dob")}</Label>
          <DatePicker />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.badge")}</Label>
          <Input type="text" placeholder={t()} />
        </div>
      </div>
    </CommonDialog>
  );
};

export default EditUser;

// Date Picker
