import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Label } from "../../components/ui/label";
import DatePiker from "../../components/common/DatePiker";
import { Input } from "../../components/ui/input";
import { CommonTextField } from "../../components/widgets/common_textField";
import CommonBox from "../../components/common/common_box";
import { Button } from "../../components/ui/button";
import { CircleFadingPlus, ImageUp, Trash2, X } from "lucide-react";
import CommonAdd from "../../components/common/common_add";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";

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
];

const AddEditDesign = ({ user, isOpen, setIsOpen }) => {
  const { t } = useTranslation("common");
  const [createName, setcreateName] = useState(false);
  const [advance, setAdvance] = useState(false);
  const [imageDialog, setImageDialog] = useState(false);

  // Image Upload Functionality
  const [image, setImage] = useState(null); // only one image

  // 🔹 Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage({
        id: imageUrl,
        file,
      });
    }
  };

  // 🔹 Remove image
  const handleRemoveImage = () => {
    setImage(null);
  };

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
          <span  onClick={() => setImageDialog(false)} className="absolute top-3 right-3 h-10 w-10 flex items-center justify-center cursor-pointer">
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
      {/* 🔹 Main Add/Edit User Dialog */}
      <CommonDialog
        isOpen={isOpen}
        onClose={handleCancel}
        size="lg"
        title={t("design.addDesign")}
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
              <div className="h-36 cursor-pointer border-dashed border rounded-2xl border-primary/40 flex flex-col items-center justify-center gap-3 text-center">
                <ImageUp className="md:size-[36px] opacity-50" />
                <p>{t("design.uploadImage")}</p>
              </div>
              <ScrollArea className="h-36 w-[calc(100vw-48px)] lg:w-[750px] p-2 shadow-inners rounded-md">
                <div className="flex w-max gap-3">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div
                      className="relative z-10 overflow-hidden rounded-lg"
                      key={index}
                    >
                      <div
                        onClick={() => setImageDialog(true)}
                        className="w-36 h-32"
                      >
                        <img
                          src="https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80"
                          alt="Images"
                          className="h-full w-full object-cover bg-cover"
                        />
                      </div>
                      <div className="absolute top-0 right-0 h-10 w-10 rounded-bl-full bg-destructive flex items-start justify-end p-1.5 cursor-pointer">
                        <Trash2 className="text-white size-5" />
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </Label>
            <Input
              id="uploadImages"
              type="file"
              accept="image/*"
              className="hidden"
            />
            <div className="flex items-center justify-end">
              <CommonButton
                as="span"
                className="sm:w-fit cursor-pointer"
                type="button"
              >
                <span className="flex items-center justify-center gap-2">
                  <CircleFadingPlus className="size-5" />
                  {t("addImage")}
                </span>
              </CommonButton>
            </div>
            <Separator />
            <div className="grid lg:!grid-cols-[1fr,1fr] gap-4">
              <div className="grid gap-2">
                <Label>{t("design.date")}</Label>
                <DatePiker />
              </div>
              <div className="grid gap-2">
                <Label>{t("design.designNo")}</Label>
                <CommonTextField
                  type="text"
                  placeholder={t("designNoPlaceholder")}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("design.selectCategory")}</Label>
                <div className="grid grid-cols-[auto,40px] gap-2">
                  <CommonBox
                    placeholders={t("design.selectCategory")}
                    frameworks={frameworks}
                  />
                  <CommonButton
                    type="button"
                    onClick={() => setcreateName(true)}
                    className="flex items-center justify-center p-0 w-10 h-10"
                  >
                    <CircleFadingPlus className="size-5" />
                  </CommonButton>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>{t("design.selectPartyName")}</Label>
                <div className="grid grid-cols-[auto,40px] gap-2">
                  <CommonBox
                    placeholders={t("design.selectPartyName")}
                    frameworks={frameworks}
                  />
                  <CommonButton
                    type="button"
                    onClick={() => setcreateName(true)}
                    className="flex items-center justify-center p-0 w-10 h-10"
                  >
                    <CircleFadingPlus className="size-5" />
                  </CommonButton>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex items-center col-span-2 gap-2">
              <Checkbox
                id="terms"
                checked={advance}
                onCheckedChange={(checked) => setAdvance(checked)}
              />
              <Label htmlFor="terms">{t("design.advance")}</Label>
            </div>
            {!advance ? (
              <>
                {/* Material */}
                <h5 className="h5-bold lg:text-lg">{t("design.material")}</h5>
                <div className="grid grid-cols-[auto,80px,120px,40px] items-end gap-3">
                  <div className="grid gap-2">
                    <Label>{t("design.item")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.item")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.quantity")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.quantity")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.price")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.price")}
                    />
                  </div>
                  <CommonButton
                    type="button"
                    className="flex items-center justify-center p-0 w-10 h-10"
                  >
                    <CircleFadingPlus className="size-5" />
                  </CommonButton>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <h6 className="h6-bold">{t("design.totalPrice")} :</h6>
                  <h6 className="h6-regular">₹00.00</h6>
                </div>
              </>
            ) : (
              <>
                {/* Advance Details */}
                {/* Paper */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center justify-between gap-3 col-span-3">
                    <h5 className="h5-bold lg:text-lg">
                      {t("design.paperDetails")}
                    </h5>
                    <CommonButton
                      type="button"
                      className="flex items-center justify-center p-0 w-10 h-10"
                    >
                      <CircleFadingPlus className="size-5" />
                    </CommonButton>
                  </div>

                  <div className="grid gap-2">
                    <Label>{t("design.designNo")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.designNo")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.paperRole")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.paperRole")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.size")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.size")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.diaPatti")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.diaPatti")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.sareePatti")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.sareePatti")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.netPaper")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.netPaper")}
                    />
                  </div>

                  <div className="col-span-3">
                    {/* Upload Button */}
                    {!image && (
                      <Label htmlFor="uploadImage">
                        <CommonButton
                          as="span"
                          className="w-full cursor-pointer"
                          type="button"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <CircleFadingPlus className="size-5" />
                            {t("addImage")}
                          </span>
                        </CommonButton>
                      </Label>
                    )}

                    {/* Hidden File Input */}
                    <Input
                      id="uploadImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />

                    {/* Image Preview */}
                    {image && (
                      <div className="mt-4 relative group border rounded-md overflow-hidden w-fit mx-auto">
                        <img
                          src={image.id}
                          alt="Uploaded"
                          className="w-40 h-40 object-cover rounded-md"
                        />

                        {/* Remove Button */}
                        <CommonButton
                          variant="destructive"
                          size="icon"
                          className="absolute top-0 right-0 rounded-bl-full h-10 w-10 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={handleRemoveImage}
                        >
                          <Trash2 className="text-white size-5" />
                        </CommonButton>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stone */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center justify-between gap-3 col-span-4">
                    <h5 className="h5-bold lg:text-lg ">
                      {t("design.stoneDetail")}
                    </h5>
                    <CommonButton
                      type="button"
                      className="flex items-center justify-center p-0 w-10 h-10"
                    >
                      <CircleFadingPlus className="size-5" />
                    </CommonButton>
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.type")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.type")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.size")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.size")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.color")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.color")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.price")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.price")}
                    />
                  </div>
                  <div className="col-span-4 flex items-center gap-3 justify-end">
                    <h6 className="h6-bold">{t("design.totalPrice")} :</h6>
                    <h6 className="h6-regular">₹00.00</h6>
                  </div>
                </div>
              </>
            )}
            <Separator />
            {/* Labour */}
            <h5 className="h5-bold lg:text-lg">{t("design.labor")}</h5>
            <div className="grid grid-cols-[auto,130px,40px] items-end gap-3">
              <div className="grid gap-2">
                <Label>{t("users.name")}</Label>
                <CommonTextField type="text" placeholder={t("users.name")} />
              </div>
              <div className="grid gap-2">
                <Label>{t("design.price")}</Label>
                <CommonTextField type="text" placeholder={t("design.price")} />
              </div>
              <CommonButton
                type="button"
                className="flex items-center justify-center p-0 w-10 h-10"
              >
                <CircleFadingPlus className="size-5" />
              </CommonButton>
            </div>
            <div className="col-span-3 flex items-center gap-3 justify-end">
              <h6 className="h6-bold">{t("design.finalAmount")} :</h6>
              <h6 className="h6-regular">₹00.00</h6>
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label>{t("design.notes")}</Label>
              <Textarea type="text" placeholder={t("design.notes")} />
            </div>
          </div>
        </ScrollArea>
      </CommonDialog>

      <CommonAdd
        createName={createName}
        setcreateName={setcreateName}
        title={t("category")}
        label={"label"}
        placehorder={"placehorder"}
      />

      <ImageDialogs />
    </>
  );
};

export default AddEditDesign;
