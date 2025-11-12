import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "../../components/ui/scroll-area";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ImageUp, Trash2, X } from "lucide-react";
import { CommonTextField } from "../../components/widgets/common_textField";
import DatePiker from "../../components/common/DatePiker";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

const AddChallan = ({ user, isOpen, setIsOpen }) => {
  const { t } = useTranslation("common");
  const [imageDialog, setImageDialog] = useState(false);

  // 🔹 Handle cancel
  const handleCancel = () => {
    setIsOpen("");
  };

  // 🔹 Handle submit
  const handleSubmit = () => {
    setIsOpen("");
  };

  // Image Dialog
  const ImageDialogs = () => {
    return (
      <>
        <CommonDialog
          isOpen={imageDialog}
          onOpenChange={setImageDialog}
          size="lg"
          title={t("")}
          className="relative"
        >
          <span
            onClick={() => setImageDialog(false)}
            className="absolute top-3 right-3 h-10 w-10 flex items-center justify-center cursor-pointer"
          >
            <X className="size-6" />
          </span>
          <div className="max-h-[calc(100dvh-200px)]">
            <img
              src="https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Preview"
              className="object-contain bg-contain max-h-[calc(100dvh-200px)] h-full w-full"
            />
          </div>
        </CommonDialog>
      </>
    );
  };

  return (
    <>
      <CommonDialog
        isOpen={isOpen}
        onClose={handleCancel}
        size="lg"
        title={t("challan.in")}
        footer={
          <div className="flex gap-2">
            <CommonButton
              variant="outline"
              className="lg:w-40"
              onClick={handleCancel}
            >
              {t("cancel")}
            </CommonButton>
            <CommonButton className="lg:w-40" onClick={handleSubmit}>
              {t("add")}
            </CommonButton>
          </div>
        }
      >
        <ScrollArea className="h-[calc(100dvh-250px)] -mr-2 pr-2">
          <div className="flex flex-col gap-4">
            <Label htmlFor="designImage">
              <div className="w-fit mx-auto">
                <div className="flex items-center justify-center relative gap-2">
                  {/* Image Open Dialog onClick -  onClick={() => setImageDialog(true)} */}
                  <div className="h-36 w-32 p-2 shadow-inners rounded-md flex items-center justify-center cursor-pointer">
                    <ImageUp className="md:size-[36px] opacity-50" />
                  </div>
                  {/* Image Open Dialog onClick -  onClick={() => setImageDialog(true)} */}
                  <div className="h-36 w-32 p-2 shadow-inners rounded-md flex items-center justify-center cursor-pointer">
                    <ImageUp className="md:size-[36px] opacity-50" />
                  </div>
                </div>
              </div>
            </Label>
            <Input
              id="uploadImages"
              type="file"
              accept="image/*"
              className="hidden"
            />

            <div className="grid sm:grid-cols-2 gap-2 md:gap-4">
              <div className="grid gap-2">
                <Label>{t("design.date")}</Label>
                <DatePiker />
              </div>
              <div className="grid gap-2">
                <Label>{t("challan.jobNo")}</Label>
                <CommonTextField
                  type="number"
                  placeholder={t("challan.jobNo")}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("challan.mall")}</Label>
                <RadioGroup defaultValue="comfortable" className="border border-border rounded-md h-10 grid grid-cols-2 gap-3 px-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">{t("challan.regular")}</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">{t("challan.rf")}</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label>{t("challan.challanNo")}</Label>
                <CommonTextField
                  type="number"
                  placeholder={t("challan.challanNo")}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("challan.totalMall")}</Label>
                <RadioGroup defaultValue="comfortable" className="border border-border rounded-md h-10 grid grid-cols-2 gap-3 px-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="default" id="m1" />
                    <Label htmlFor="m1">{t("challan.piece")}</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="comfortable" id="m2" />
                    <Label htmlFor="m2">{t("challan.meter")}</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label className="text-transparent">{t("challan.challanNo")}</Label>
                <CommonTextField
                  type="number"
                  placeholder={t("challan.totalMall")}
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </CommonDialog>

      <ImageDialogs />
    </>
  );
};

export default AddChallan;
