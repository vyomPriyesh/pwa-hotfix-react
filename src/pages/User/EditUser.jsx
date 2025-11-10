import React from "react";
import { DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import { AiFillEdit } from "react-icons/ai";
import CommonDialog from "../../components/widgets/common_dialog";

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
            {t("confirm")}
          </CommonButton>
        </div>
      }
    >
      <div className="grid gap-2">
        <Label>{t("users.badge")}</Label>
        <Input type="text" defaultValue={0} />
      </div>
    </CommonDialog>
  );
};

export default EditUser;
