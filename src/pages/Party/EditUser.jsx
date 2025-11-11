import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { ScrollArea } from "../../components/ui/scroll-area";

const EditUser = ({ user, isOpen, setIsOpen }) => {
  const { t } = useTranslation("common");

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
      <ScrollArea className="h-[calc(100%-250px)] -mr-2 pr-2">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>{t("users.name")}</Label>
          <Input type="text" placeholder={t("usernamePlaceholder")} />
        </div>
      </div>
      </ScrollArea>
    </CommonDialog>
  );
};

export default EditUser;

// Date Picker
