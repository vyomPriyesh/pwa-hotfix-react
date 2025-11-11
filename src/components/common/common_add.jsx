import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";

const CommonAdd = ({ createName, setcreateName, title, label, placehorder }) => {
  const { t } = useTranslation("common");

  return (
    <CommonDialog
      isOpen={createName}
      onClose={() => setcreateName("")}
      size="sm"
      title={title}
      footer={
        <div className="flex gap-2">
          <CommonButton variant="outline" onClick={() => setcreateName("")}>
            {t("cancel")}
          </CommonButton>
          <CommonButton onClick={() => setcreateName("")}>
            {t("Create")}
          </CommonButton>
        </div>
      }
    >
      <div className="grid gap-4">
       
        <div className="grid gap-2">
          <Label>{label}</Label>
          <Input type="text" placeholder={placehorder} />
        </div>
      </div>
    </CommonDialog>
    )
}

export default CommonAdd
