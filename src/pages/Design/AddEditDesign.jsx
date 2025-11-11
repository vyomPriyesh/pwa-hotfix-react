import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Label } from "../../components/ui/label";
import DatePiker from "../../components/common/DatePiker";
import { Input } from "../../components/ui/input";
import { CommonTextField } from "../../components/widgets/common_textField";
import CommonBox from "../../components/common/common_box";
import { Button } from "../../components/ui/button";
import { CircleFadingPlus } from "lucide-react";
import CommonAdd from "../../components/common/common_add";

const frameworks = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "work",
    label: "Job Work",
  },
  {
    value: "tempo",
    label: "Tempo Driver",
  },
]

const AddEditDesign = ({ user, isOpen, setIsOpen }) => {
  const { t } = useTranslation("common");
  const [createName, setcreateName] = useState(false);

  console.log(createName,"open")

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
              <CommonTextField
                type="text"
                placeholder={t("designNoPlaceholder")}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label>{t("design.selectCategory")}</Label>
              <div className="grid grid-cols-[auto,40px] gap-2">
                <CommonBox placeholders={t("design.selectCategory")} frameworks={frameworks} />
                <Button
                  type="button"
                onClick={() => setcreateName(true)}
                  className="flex items-center justify-center p-0 w-10 h-10"
                >
                  <CircleFadingPlus className="size-5" />
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>{t("design.selectPartyName")}</Label>
              <div className="grid grid-cols-[auto,40px] gap-2">
                <CommonBox placeholders={t("design.selectPartyName")} frameworks={frameworks} />
                <Button
                  type="button"
                onClick={() => setcreateName(true)}
                  className="flex items-center justify-center p-0 w-10 h-10"
                >
                  <CircleFadingPlus className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CommonDialog>

      <CommonAdd createName={createName} setcreateName={setcreateName} title={t("category")} label={"label"} placehorder={"placehorder"} />
    </>
  );
};

export default AddEditDesign;
