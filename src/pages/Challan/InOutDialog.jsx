import React, { useState } from "react";
import CommonDialog from "../../components/widgets/common_dialog";
import { X } from "lucide-react";
import CommonButton from "../../components/widgets/common_button";
import { useTranslation } from "react-i18next";

import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

import { Label } from "../../components/ui/label";

const InOutDialog = ({ open, setClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const [inOut, setInOut] = useState(null);

  const handleCancel = () => {
    setClose();
    setInOut(null);
  };

  const handleSubmit = () => {
    onSubmit(inOut);
  };

  return (
    <>
      <CommonDialog
        isOpen={open}
        onClose={handleCancel}
        size="sm"
        title=""
        footer={
          <div className="flex gap-2 w-full">
            <CommonButton
              variant="destructive"
              className="lg:w-full"
              onClick={handleCancel}
            >
              {t("cancel")}
            </CommonButton>

            <CommonButton
              className="lg:w-full"
              onClick={handleSubmit}
              disabled={!inOut}
            >
              {t("next")}
            </CommonButton>
          </div>
        }
        className="relative"
      >
        <span
          onClick={() => setClose(false)}
          className="absolute top-3 right-3 h-10 w-10 flex items-center justify-center cursor-pointer"
        >
          <X className="size-6" />
        </span>

        {/* 🔥 RADIO GROUP with BOX STYLE */}
        <RadioGroup
          value={inOut || ""}
          onValueChange={(val) => setInOut(val)}
          className="flex items-center justify-center gap-6 mt-4"
        >
          {/* IN BOX */}
          <Label
            htmlFor="in"
            className={`size-36 flex flex-col items-center gap-3.5 justify-center cursor-pointer rounded-lg shadow-user_card border-2 text-lg font-medium
            ${inOut === "in" ? "border-green-600" : "border-transparent"}
          `}
          >
            <span className="size-16 text-white flex items-center justify-center bg-green-600 rounded-lg mx-auto">IN</span>
            <RadioGroupItem
              className={`text-green-600 border-2 ${
                inOut === "in" ? "!border-green-600" : ""
              } `}
              id="in"
              value="in"
            />
          </Label>

          {/* OUT BOX */}
          <Label
            htmlFor="out"
            className={`size-36 flex flex-col items-center gap-3.5 justify-center cursor-pointer rounded-lg shadow-user_card border-2 text-lg font-medium
            ${inOut === "out" ? "border-destructive" : "border-transparent"}
          `}
          >
            <span className="size-16 text-white flex items-center justify-center bg-destructive rounded-lg mx-auto">OUT</span>
            <RadioGroupItem
              className={`text-destructive border-2 ${
                inOut === "out" ? "!border-destructive" : ""
              } `}
              id="out"
              value="out"
            />
          </Label>
        </RadioGroup>
      </CommonDialog>
    </>
  );
};

export default InOutDialog;
