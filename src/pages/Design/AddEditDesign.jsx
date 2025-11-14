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
import { getIn, useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../service/auth.service";
import config from "../../config";
import { useSelector } from "react-redux";
import AddEditCategory from "../Category/AddEditCategory";
import AddEditParty from "../Party/AddEditParty";

const AddEditDesign = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation("common");
  const [createName, setcreateName] = useState(false);
  const [imageDialog, setImageDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const IMG_URL = config.baseImage;
  const { data } = useSelector(state => state?.dropdown)

  const handleImageUpload = async (e) => {

    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("images", file);

        const response = await AuthService.imageUpload(formData);

        if (response.data.success) {
          const uploadedUrl = IMG_URL + response.data.data[0];
          uploadedUrls.push(uploadedUrl);
        }
      }

      const updatedImages = [...formik.values.images, ...uploadedUrls];
      formik.setFieldValue("images", updatedImages);

    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (urlToRemove) => {
    const updatedImages = formik.values.images.filter((url) => url !== urlToRemove);

    formik.setFieldValue("images", updatedImages);
  };

  const initialValues = {
    advance: false,
    images: [],
    date: "",
    designNo: "",
    category: "",
    party: "",
    notes: "",
    materials: [{ item: "", quantity: "", price: "" }],
    labours: [{ name: "", price: "" }],
    paper: [{ designNo: "", paperRole: "", size: "", diaPatti: "", sareePatti: "", netPaper: "", image: null }],
    stones: [{ type: "", size: "", color: "", price: "" }],
  }

  const validationSchema = Yup.object({
    images: Yup.array()
      .min(1, "Please upload at least one image.")
      .required("Please upload at least one image."),
    designNo: Yup.string().required("Design No is required"),
    category: Yup.string().required("Category is required"),
    party: Yup.string().required("Party Name is required"),
    notes: Yup.string().required("notes is required"),
    labours: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("Name is required"),
          price: Yup.number().typeError("Must be number").required("Price required"),
        })
      )
      .min(1, "At least one labour required"),
    materials: Yup.array().when("advance", {
      is: false,
      then: (schema) =>
        schema.of(
          Yup.object({
            item: Yup.string().required("Item required"),
            quantity: Yup.number().typeError("Must be number").required("Quantity required"),
            price: Yup.number().typeError("Must be number").required("Price required"),
          })
        ),
    }),
    paper: Yup.array().when("advance", {
      is: true,
      then: (schema) =>
        schema.of(
          Yup.object({
            designNo: Yup.string().required("Design No required"),
            paperRole: Yup.string().required("Paper Role required"),
            size: Yup.string().required("Size required"),
            diaPatti: Yup.string().required("diaPatti required"),
            sareePatti: Yup.string().required("sareePatti required"),
            netPaper: Yup.string().required("netPaper required"),
            image: Yup.mixed().nullable().required("Please upload image."),
          })
        ),
    }),
    stones: Yup.array().when("advance", {
      is: true,
      then: (schema) =>
        schema.of(
          Yup.object({
            type: Yup.string().required("type required"),
            size: Yup.string().required("size required"),
            color: Yup.string().required("color required"),
            price: Yup.string().required("price required")
          })
        ),
    }),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("✅ Submitted values:", { values });
    },
  })

  return (
    <>

      <CommonDialog
        isOpen={isOpen}
        onClose={() => setIsOpen("")}
        size="lg"
        title={t("design.addDesign")}
        footer={
          <div className="flex gap-2">
            <CommonButton
              variant="outline"
              className="lg:w-40"
              onClose={() => setIsOpen("")}
            >
              {t("cancel")}
            </CommonButton>
            <CommonButton className="lg:w-40" onClick={formik.handleSubmit} >
              {t("add")}
            </CommonButton>
          </div>
        }
      >
        <ScrollArea className="h-[calc(100dvh-250px)] -mr-2 pr-2">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <Label htmlFor="designImage">
              {formik.values.images.length === 0 && (
                <div className="h-36 cursor-pointer border-dashed border rounded-2xl border-primary/40 flex flex-col items-center justify-center gap-3 text-center">
                  <ImageUp className="md:size-[36px] opacity-50" />
                  <p>{t("design.uploadImage")}</p>
                </div>
              )}
            </Label>
            {formik.touched.images && formik.errors.images && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.images}</p>
            )}
            <Input
              id="designImage"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />

            {formik.values.images.length > 0 && (
              <ScrollArea className="h-36 w-[calc(100vw-48px)] lg:w-[750px] p-2 shadow-inners rounded-md">
                <div className="flex w-max gap-3">
                  {formik.values.images?.map((item, index) => (
                    <div
                      className="relative z-10 overflow-hidden rounded-lg"
                      key={index}
                    >
                      <div
                        onClick={() => setImageDialog(true)}
                        className="w-36 h-32"
                      >
                        <img
                          src={item}
                          alt="Images"
                          className="h-full w-full object-cover bg-cover"
                        />
                      </div>
                      <div onClick={() => handleRemoveImage(item)} className="absolute top-0 right-0 h-10 w-10 rounded-bl-full bg-destructive flex items-start justify-end p-1.5 cursor-pointer">
                        <Trash2 className="text-white size-5" />
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
            {formik.values.images.length > 0 && (
              <div className="flex items-center justify-end">
                <CommonButton
                  as="span"
                  className="sm:w-fit cursor-pointer"
                  type="button"
                >
                  <Label className="flex items-center justify-center gap-2" htmlFor="designImage">
                    <CircleFadingPlus className="size-5" />
                    {t("addImage")}
                  </Label>
                </CommonButton>
              </div>
            )}
            <Separator />
            <div className="grid lg:!grid-cols-[1fr,1fr] gap-4">
              <div className="grid gap-2">
                <Label>{t("design.date")}</Label>
                <DatePiker
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.date}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>{t("design.designNo")}</Label>
                <CommonTextField
                  type="text"
                  placeholder={t("designNoPlaceholder")}
                  name="designNo"
                  value={formik.values.designNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.designNo && formik.errors.designNo && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.designNo}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>{t("design.selectCategory")}</Label>
                <div className="grid grid-cols-[auto,40px] gap-2">
                  <div>
                    <CommonBox
                      placeholders={t("design.selectCategory")}
                      frameworks={data?.data?.categories}
                      name="category"
                      value={formik.values.category}
                      onChange={(val) => formik.setFieldValue("category", val)}
                      onBlur={() => formik.setFieldTouched("category", true)}
                    />
                    {formik.touched.category && formik.errors.category && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
                    )}
                  </div>
                  <CommonButton
                    type="button"
                    onClick={() => setIsOpenDialog("category")}
                    className="flex items-center justify-center p-0 w-10 h-10"
                  >
                    <CircleFadingPlus className="size-5" />
                  </CommonButton>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>{t("design.selectPartyName")}</Label>
                <div className="grid grid-cols-[auto,40px] gap-2">
                  <div>
                    <CommonBox
                      placeholders={t("design.selectPartyName")}
                      frameworks={data?.data?.parties}
                      name="party"
                      value={formik.values.party}
                      onChange={(val) => formik.setFieldValue("party", val)}
                      onBlur={() => formik.setFieldTouched("party", true)}
                    />
                    {formik.touched.party && formik.errors.party && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.party}</p>
                    )}
                  </div>
                  <CommonButton
                    type="button"
                    onClick={() => setIsOpenDialog("party")}
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
                checked={formik.values.advance}
                onCheckedChange={(checked) => formik.setFieldValue("advance", checked)}
              />
              <Label htmlFor="terms">{t("design.advance")}</Label>
            </div>
            {!formik.values.advance ? (
              <>
                {/* Material */}
                <h5 className="h5-bold lg:text-lg">{t("design.material")}</h5>
                {formik.values.materials.map((mat, i) => {
                  const itemTouched = getIn(formik.touched, `materials[${i}].item`);
                  const itemError = getIn(formik.errors, `materials[${i}].item`);
                  const qtyTouched = getIn(formik.touched, `materials[${i}].quantity`);
                  const qtyError = getIn(formik.errors, `materials[${i}].quantity`);
                  const priceTouched = getIn(formik.touched, `materials[${i}].price`);
                  const priceError = getIn(formik.errors, `materials[${i}].price`);

                  return (
                    <div className="grid grid-cols-[auto,80px,120px,40px] items-end gap-3">
                      <div className="grid gap-2">
                        <Label>{t("design.item")}</Label>
                        <CommonTextField
                          type="text"
                          placeholder={t("design.item")}
                          name={`materials[${i}].item`}
                          value={mat.item}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {itemTouched && itemError && (
                          <p className="text-red-500 text-sm mt-1">{itemError}</p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label>{t("design.quantity")}</Label>
                        <CommonTextField
                          type="text"
                          placeholder={t("design.quantity")}
                          name={`materials[${i}].quantity`}
                          value={mat.quantity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {qtyTouched && qtyError && (
                          <p className="text-red-500 text-sm mt-1">{qtyError}</p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label>{t("design.price")}</Label>
                        <CommonTextField
                          type="text"
                          placeholder={t("design.price")}
                          name={`materials[${i}].price`}
                          value={mat.price}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {priceTouched && priceError && (
                          <p className="text-red-500 text-sm mt-1">{priceError}</p>
                        )}
                      </div>
                      {formik.values.materials.length > 1 ? (
                        <div className="flex items-center justify-center h-10 w-10 p-0 rounded-lg bg-destructive cursor-pointer"
                          onClick={() => {
                            const updated = formik.values.materials.filter((_, idx) => idx !== i);
                            formik.setFieldValue("materials", updated);
                          }}
                        >
                          <Trash2 className="text-white size-5" />
                        </div>
                      ) : (
                        <CommonButton
                          type="button"
                          className="flex items-center justify-center p-0 w-10 h-10"
                          onClick={() =>
                            formik.setFieldValue("materials", [
                              ...formik.values.materials,
                              { item: "", quantity: "", price: "" },
                            ])
                          }
                        >
                          <CircleFadingPlus className="size-5" />
                        </CommonButton>
                      )}
                    </div>
                  )
                })}
                {formik.values.materials.length > 1 && (
                  <CommonButton
                    type="button"
                    className="flex items-center justify-center p-0 w-10 h-10"
                    onClick={() =>
                      formik.setFieldValue("materials", [
                        ...formik.values.materials,
                        { item: "", quantity: "", price: "" },
                      ])
                    }
                  >
                    <CircleFadingPlus className="size-5" />
                  </CommonButton>
                )}
                <div className="flex items-center gap-3 justify-end">
                  <h6 className="h6-bold">{t("design.totalPrice")} :</h6>
                  <h6 className="h6-regular">₹00.00</h6>
                </div>
              </>
            ) : (
              <>
                {/* Paper */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center justify-between gap-3 col-span-3">
                    <h5 className="h5-bold lg:text-lg">
                      {t("design.paperDetails")}
                    </h5>
                    <CommonButton
                      type="button"
                      className="flex items-center justify-center p-0 w-10 h-10"
                      onClick={() =>
                        formik.setFieldValue("paper", [
                          ...formik.values.paper,
                          { designNo: "", paperRole: "", size: "", diaPatti: "", sareePatti: "", netPaper: "", image: null },
                        ])
                      }
                    >
                      <CircleFadingPlus className="size-5" />
                    </CommonButton>
                  </div>
                  {formik.values.paper.map((pap, i) => {
                    const designTouched = getIn(formik.touched, `paper[${i}].designNo`);
                    const designError = getIn(formik.errors, `paper[${i}].designNo`);
                    const roleTouched = getIn(formik.touched, `paper[${i}].paperRole`);
                    const roleError = getIn(formik.errors, `paper[${i}].paperRole`);
                    const sizeTouched = getIn(formik.touched, `paper[${i}].size`);
                    const sizeError = getIn(formik.errors, `paper[${i}].size`);
                    const diaPattiTouched = getIn(formik.touched, `paper[${i}].diaPatti`);
                    const diaPattiError = getIn(formik.errors, `paper[${i}].diaPatti`);
                    const sareePattiTouched = getIn(formik.touched, `paper[${i}].sareePatti`);
                    const sareePattiError = getIn(formik.errors, `paper[${i}].sareePatti`);
                    const netPaperTouched = getIn(formik.touched, `paper[${i}].netPaper`);
                    const netPaperError = getIn(formik.errors, `paper[${i}].netPaper`);

                    const handlePaperImage = async (e, idx) => {
                      const file = e.target.files[0];
                      const formData = new FormData();
                      formData.append("images", file);

                      const response = await AuthService.imageUpload(formData);

                      if (response?.data?.success) {
                        const imageUrl = IMG_URL + response.data.data[0];

                        const updated = [...formik.values.paper];
                        updated[idx] = { ...updated[idx], image: imageUrl };
                        formik.setFieldValue("paper", updated);
                        formik.setFieldTouched(`paper[${idx}].image`, true, false);
                      };
                    }

                    const handleRemovePaperImage = (idx) => {
                      const updated = [...formik.values.paper];
                      updated[idx] = { ...updated[idx], image: null };
                      formik.setFieldValue("paper", updated);
                      formik.setFieldTouched(`paper[${idx}].image`, true, false);
                    };

                    return (
                      <>
                        <div className="grid gap-2">
                          <Label>{t("design.designNo")}</Label>
                          <CommonTextField
                            type="text"
                            placeholder={t("design.designNo")}
                            name={`paper[${i}].designNo`}
                            value={pap.designNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {designTouched && designError && (
                            <p className="text-red-500 text-sm mt-1">{designError}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>{t("design.paperRole")}</Label>
                          <CommonTextField
                            type="text"
                            placeholder={t("design.paperRole")}
                            name={`paper[${i}].paperRole`}
                            value={pap.paperRole}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {roleTouched && roleError && (
                            <p className="text-red-500 text-sm mt-1">{roleError}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>{t("design.size")}</Label>
                          <CommonTextField
                            type="text"
                            placeholder={t("design.size")}
                            name={`paper[${i}].size`}
                            value={pap.size}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {sizeTouched && sizeError && (
                            <p className="text-red-500 text-sm mt-1">{sizeError}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>{t("design.diaPatti")}</Label>
                          <CommonTextField
                            type="text"
                            placeholder={t("design.diaPatti")}
                            name={`paper[${i}].diaPatti`}
                            value={pap.diaPatti}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {diaPattiTouched && diaPattiError && (
                            <p className="text-red-500 text-sm mt-1">{diaPattiError}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>{t("design.sareePatti")}</Label>
                          <CommonTextField
                            type="text"
                            placeholder={t("design.sareePatti")}
                            name={`paper[${i}].sareePatti`}
                            value={pap.sareePatti}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {sareePattiTouched && sareePattiError && (
                            <p className="text-red-500 text-sm mt-1">{sareePattiError}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>{t("design.netPaper")}</Label>
                          <CommonTextField
                            type="text"
                            placeholder={t("design.netPaper")}
                            name={`paper[${i}].netPaper`}
                            value={pap.netPaper}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {netPaperTouched && netPaperError && (
                            <p className="text-red-500 text-sm mt-1">{netPaperError}</p>
                          )}
                        </div>

                        {formik.values.paper.length > 1 && (
                          <div className="flex items-center justify-center h-10 w-10 p-0 rounded-lg bg-destructive cursor-pointer"
                            onClick={() => {
                              const updated = formik.values.paper.filter((_, idx) => idx !== i);
                              formik.setFieldValue("paper", updated);
                            }}
                          >
                            <Trash2 className="text-white size-5" />
                          </div>
                        )}
                        <div className="col-span-3">
                          {!pap?.image && (
                            <>
                              <CommonButton
                                as="span"
                                className="w-full cursor-pointer"
                                type="button"
                                onClick={() => document.getElementById(`uploadImage_${i}`).click()}
                              >
                                <span className="flex items-center justify-center gap-2">
                                  <CircleFadingPlus className="size-5" />
                                  {t("addImage")}
                                </span>
                              </CommonButton>

                              <Input
                                id={`uploadImage_${i}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handlePaperImage(e, i)}
                              />
                            </>
                          )}

                          {pap?.image && (
                            <div className="mt-4 relative group border rounded-md overflow-hidden w-fit mx-auto">
                              <img
                                src={pap?.image}
                                alt="Uploaded"
                                className="w-40 h-40 object-cover rounded-md"
                              />

                              {/* Remove Button */}
                              <CommonButton
                                variant="destructive"
                                size="icon"
                                className="absolute top-0 right-0 rounded-bl-full h-10 w-10 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                onClick={() => handleRemovePaperImage(i)}
                              >
                                <Trash2 className="text-white size-5" />
                              </CommonButton>
                            </div>
                          )}

                        </div>
                      </>
                    )
                  })}

                </div>

                {/* Stone */}
                <div className="grid grid-cols-3 gap-3">
                  {formik.values.stones.map((sto, i) => {
                    const typeTouched = getIn(formik.touched, `stones[${i}].type`);
                    const typeError = getIn(formik.errors, `stones[${i}].type`);
                    const sizeTouched = getIn(formik.touched, `stones[${i}].size`);
                    const sizeError = getIn(formik.errors, `stones[${i}].size`);
                    const colorTouched = getIn(formik.touched, `stones[${i}].color`);
                    const colorError = getIn(formik.errors, `stones[${i}].color`);
                    const priceTouched = getIn(formik.touched, `stones[${i}].price`);
                    const priceError = getIn(formik.errors, `stones[${i}].price`);

                    return (
                      <>
                        <div className="flex items-center justify-between gap-3 col-span-4">
                          <h5 className="h5-bold lg:text-lg ">
                            {t("design.stoneDetail")}
                          </h5>
                          <CommonButton
                            type="button"
                            className="flex items-center justify-center p-0 w-10 h-10"
                            onClick={() =>
                              formik.setFieldValue("stones", [
                                ...formik.values.stones,
                                { type: "", size: "", color: "", price: "" },
                              ])
                            }
                          >
                            <CircleFadingPlus className="size-5" />
                          </CommonButton>
                        </div>
                        <div className="grid gap-2">
                          <Label>{t("design.type")}</Label>
                          <CommonTextField
                            type="text"
                            placeholder={t("design.type")}
                            name={`stones[${i}].type`}
                            value={sto.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {typeTouched && typeError && (
                            <p className="text-red-500 text-sm mt-1">{typeError}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>{t("design.size")}</Label>
                          <CommonTextField
                            type="text"
                            placeholder={t("design.size")}
                            name={`stones[${i}].size`}
                            value={sto.size}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {sizeTouched && sizeError && (
                            <p className="text-red-500 text-sm mt-1">{sizeError}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>{t("design.color")}</Label>
                          <CommonTextField
                            type="text"
                            placeholder={t("design.color")}
                            name={`stones[${i}].color`}
                            value={sto.color}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {colorTouched && colorError && (
                            <p className="text-red-500 text-sm mt-1">{colorError}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>{t("design.price")}</Label>
                          <CommonTextField
                            type="text"
                            placeholder={t("design.price")}
                            name={`stones[${i}].price`}
                            value={sto.item}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {priceTouched && priceError && (
                            <p className="text-red-500 text-sm mt-1">{priceError}</p>
                          )}
                        </div>

                        {formik.values.stones.length > 1 && (
                          <div className="flex items-center justify-center h-10 w-10 p-0 rounded-lg bg-destructive cursor-pointer"
                            onClick={() => {
                              const updated = formik.values.stones.filter((_, idx) => idx !== i);
                              formik.setFieldValue("stones", updated);
                            }}
                          >
                            <Trash2 className="text-white size-5" />
                          </div>
                        )}
                      </>
                    )
                  })}
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
            {formik.values.labours.map((lab, i) => {
              const nameTouched = getIn(formik.touched, `labours[${i}].name`);
              const nameError = getIn(formik.errors, `labours[${i}].name`);
              const priceTouched = getIn(formik.touched, `labours[${i}].price`);
              const priceError = getIn(formik.errors, `labours[${i}].price`);

              return (
                <div className="grid grid-cols-[auto,130px,40px] items-end gap-3">
                  <div className="grid gap-2">
                    <Label>{t("users.name")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("users.name")}
                      name={`labours[${i}].name`}
                      value={lab.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {nameTouched && nameError && (
                      <p className="text-red-500 text-sm mt-1">{nameError}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("design.price")}</Label>
                    <CommonTextField
                      type="text"
                      placeholder={t("design.price")}
                      name={`labours[${i}].price`}
                      value={lab.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {priceTouched && priceError && (
                      <p className="text-red-500 text-sm mt-1">{priceError}</p>
                    )}
                  </div>
                  {formik.values.labours.length > 1 ? (
                    <div className="flex items-center justify-center h-10 w-10 p-0 rounded-lg bg-destructive cursor-pointer"
                      onClick={() => {
                        const updated = formik.values.labours.filter((_, idx) => idx !== i);
                        formik.setFieldValue("labours", updated);
                      }}
                    >
                      <Trash2 className="text-white size-5" />
                    </div>
                  ) : (
                    <CommonButton
                      type="button"
                      className="flex items-center justify-center p-0 w-10 h-10"
                      onClick={() =>
                        formik.setFieldValue("labours", [
                          ...formik.values.labours,
                          { name: "", price: "" },
                        ])
                      }
                    >
                      <CircleFadingPlus className="size-5" />
                    </CommonButton>
                  )}
                </div>
              )
            })}
            {formik.values.labours.length > 1 && (
              <CommonButton
                type="button"
                className="flex items-center justify-center p-0 w-10 h-10"
                onClick={() =>
                  formik.setFieldValue("labours", [
                    ...formik.values.labours,
                    { name: "", price: "" },
                  ])
                }
              >
                <CircleFadingPlus className="size-5" />
              </CommonButton>
            )}
            <div className="col-span-3 flex items-center gap-3 justify-end">
              <h6 className="h6-bold">{t("design.finalAmount")} :</h6>
              <h6 className="h6-regular">₹00.00</h6>
            </div>
            <Separator />

            <div className="grid gap-2">
              <Label>{t("design.notes")}</Label>
              <Textarea
                type="text"
                placeholder={t("design.notes")}
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.notes && formik.errors.notes && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.notes}</p>
              )}
            </div>
          </form>
        </ScrollArea>
      </CommonDialog>

      <CommonAdd
        createName={createName}
        setcreateName={setcreateName}
        title={t("category")}
        label={"label"}
        placehorder={"placehorder"}
      />


      <AddEditCategory
        isOpen={isOpenDialog === "category"}
        setIsOpen={setIsOpenDialog}
        isEdit={isOpen}
      />

      <AddEditParty
        isOpen={isOpenDialog === "party"}
        setIsOpen={setIsOpenDialog}
        isEdit={isOpen}
      />
    </>
  );
};

export default AddEditDesign;
