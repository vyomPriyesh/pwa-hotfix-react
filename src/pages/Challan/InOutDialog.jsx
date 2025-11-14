import React, { useState } from "react";
import CommonDialog from "../../components/widgets/common_dialog";
import { X } from "lucide-react";
import CommonButton from "../../components/widgets/common_button";
import { useTranslation } from "react-i18next";

const InOutDialog = ({ open, setClose ,onSubmit}) => {

  const { t } = useTranslation("common");
  const [inOut, setInOut] = useState(null);

  // 🔹 Handle cancel
  const handleCancel = () => {
    setClose();
    setInOut(null)
  };

  // 🔹 Handle submit
  const handleSubmit = () => {
    onSubmit(inOut);
  };
  
  return (
    <>
      <CommonDialog
        isOpen={open}
        onClose={handleCancel}
        size="default"
        title=""
        footer={
          <div className="flex gap-2">
            <CommonButton
              variant="destructive"
              className="lg:w-40"
              onClick={handleCancel}
            >
              {t("cancel")}
            </CommonButton>
            <CommonButton className="lg:w-40" onClick={handleSubmit}>
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
        <div className="flex items-center justify-center gap-4">
          {/* 🔥 Selection Boxes */}
          <div className="flex items-center justify-center gap-4 py-4">

            {/* FIRST BOX → sets inOut = true */}
            <div
              onClick={() => setInOut("in")}
              className={`size-36 cursor-pointer rounded-lg shadow-user_card duration-200 border 
              ${inOut === 'in' ? "border-green-700" : "border-transparent"}
            `}
            >IN</div>

            {/* SECOND BOX → sets inOut = false */}
            <div
              onClick={() => setInOut("out")}
              className={`size-36 cursor-pointer rounded-lg shadow-user_card duration-200 border 
              ${inOut === 'out' ? "border-red-700" : "border-transparent"}
            `}
            >OUT</div>
          </div>
        </div>
      </CommonDialog>
    </>
  );
};

export default InOutDialog;
