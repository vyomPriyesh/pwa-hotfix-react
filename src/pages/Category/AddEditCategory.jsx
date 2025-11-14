import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import masterService from "../../service/master.service";
import { Toaster } from "../../components/ui/toaster";
import { useDispatch } from "react-redux";
import { fetchAllDropdown } from "../../store/slice/dropdown";

const AddEditCategory = ({ user, isOpen, setIsOpen, selectedData = '' }) => {
  const { t } = useTranslation("common");
  const isEdit = !!selectedData

  const dispatch = useDispatch();

  const initialValues = {
    name: selectedData?.name || "",
    contact_person: selectedData?.contact_person || "",
    email: selectedData?.email || "",
    mobile: selectedData?.mobile || "",
    address: selectedData?.address || "",
    gst: selectedData?.gst || "",
    pancard: selectedData?.pancard || ""
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Category name is required")
      .max(100, "Must be 100 characters or less"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        name: values?.name,
      }

      if (isEdit) {
        await masterService.updateCategory(selectedData?._id, payload)
      } else {
        await masterService.addCategory(payload)
        dispatch(fetchAllDropdown());
      }

      resetForm();
      setIsOpen("");
    } catch (error) {
      Toaster(
        "error",
        error?.response?.error?.error_message || t("messages.somethingWentWrong")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <CommonDialog
      isOpen={isOpen}
      onClose={() => setIsOpen("")}
      size="sm"
      title={isEdit ? "Update Category" : "Create Category"}
      footer={
        <div className="flex gap-2">
          <CommonButton variant="outline" onClick={() => setIsOpen("")}>
            {t("cancel")}
          </CommonButton>
          <CommonButton
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            {isEdit ? "Update" : "Create"}
          </CommonButton>
        </div>
      }
    >
      <div className="grid gap-4">

        <form onSubmit={formik.handleSubmit} className="grid gap-2">
          <Label>{t("users.name")}</Label>
          <Input type="text" placeholder={t("usernamePlaceholder")}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </form>
      </div>
    </CommonDialog>
  );
};

export default AddEditCategory;

// Date Picker
