import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Label } from "../../components/ui/label";
import DatePiker from "../../components/common/DatePiker";
import { Input } from "../../components/ui/input";

const AddEditDesign = ({ user, isOpen, setIsOpen }) => {
  const { t } = useTranslation("common");

  // 🔹 Handle cancel
  const handleCancel = () => {
    setIsOpen("");
  };

  // 🔹 Handle submit
  const handleSubmit = () => {
    setIsOpen("");
  };

  return (
    <>
      {/* 🔹 Main Add/Edit User Dialog */}
      <CommonDialog
        isOpen={isOpen}
        onClose={handleCancel}
        size="lg"
        title={t("design.addDesign")}
        footer={
          <div className="flex gap-2">
            <CommonButton variant="outline" onClick={handleCancel}>
              {t("cancel")}
            </CommonButton>
            <CommonButton onClick={handleSubmit}>{t("submit")}</CommonButton>
          </div>
        }
      >
        <ScrollArea className="h-[calc(100dvh-250px)] -mr-2 pr-2">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>{t("design.date")}</Label>
              <DatePiker />
            </div>
            <div className="grid gap-2">
              <Label>{t("design.designNo")}</Label>
              <Input
                type="text"
                name="name"
                placeholder={t("designNoPlaceholder")}
              />
            </div>
          </div>
        </ScrollArea>
      </CommonDialog>
    </>
  );
};

export default AddEditDesign;
