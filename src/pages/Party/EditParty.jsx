import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Textarea } from "../../components/ui/textarea";

const EditParty = ({ user, isOpen, setIsOpen }) => {
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
            {t("Create")}
          </CommonButton>
        </div>
      }
    >
      {/* <ScrollArea className="h-[calc(100%-250px)] -mr-2 pr-2"> */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>{t("party.company")}</Label>
          <Input type="text" placeholder={t("companyPlaceholder")} />
        </div>
        <div className="grid gap-2">
          <Label>{t("party.name")}</Label>
          <Input type="text" placeholder={t("contactPersonPlaceholder")} />
        </div>
        <div className="grid gap-2">
          <Label>{t("party.mobile")}</Label>
          <Input type="text" placeholder={t("mobilePlaceholder")} />
        </div>
        <div className="grid gap-2">
          <Label>{t("users.email")}</Label>
          <Input type="text" placeholder={t("emailPlaceholder")} />
        </div>
        <div className="grid gap-2">
          <Label>{t("party.pancard")}</Label>
          <Input type="text" placeholder={t("pancardPlaceholder")} />
        </div>
        <div className="grid gap-2">
          <Label>{t("party.gstin")}</Label>
          <Input type="text" placeholder={t("gstPlaceholder")} />
        </div>
        <div className="grid col-span-2 gap-2">
          <Label>{t("party.address")}</Label>
          <Textarea type="text" placeholder={t("addressPlaceholder")} />
        </div>
      </div>
      {/* </ScrollArea> */}
    </CommonDialog>
  );
};

export default EditParty;

// Date Picker
