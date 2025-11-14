import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { Textarea } from "../../components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import masterService from "../../service/master.service";
import { Toaster } from "../../components/ui/toaster";
import { fetchAllDropdown } from "../../store/slice/dropdown";
import { useDispatch } from "react-redux";

const AddEditParty = ({ user, isOpen, setIsOpen, selectedData = "" }) => {
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
      .required("Company name is required")
      .max(100, "Must be 100 characters or less"),
    contact_person: Yup.string()
      .required("Contact person name is required")
      .max(50, "Must be 50 characters or less"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    address: Yup.string()
      .required("Address is required")
      .max(255, "Must be 255 characters or less"),
    gst: Yup.string()
      .matches(/^[0-9A-Z]{15}$/, "Invalid GST number format")
      .required("GST number is required"),
    pancard: Yup.string()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN number")
      .required("PAN number is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("login api");

    try {
      const payload = {
        name: values?.name,
        contact_person: values?.contact_person,
        email: values?.email,
        mobile: values?.mobile,
        address: values?.address,
        gst: values?.gst,
        pancard: values?.pancard
      }

      if (isEdit) {
        await masterService.updateParty(selectedData?._id, payload)
      } else {
        await masterService.addParty(payload)
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
      size="lg"
      title={isEdit ? "Edit Party" : "Add Party"}
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
      <form onSubmit={formik.handleSubmit} className="grid lg:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>{t("party.company")}</Label>
          <Input type="text" placeholder={t("companyPlaceholder")}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>{t("party.name")}</Label>
          <Input type="text" placeholder={t("contactPersonPlaceholder")}
            name="contact_person"
            value={formik.values.contact_person}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contact_person && formik.errors.contact_person && (
            <p className="text-red-500 text-sm">{formik.errors.contact_person}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>{t("party.mobile")}</Label>
          <Input type="number" placeholder={t("mobilePlaceholder")}
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>{t("users.email")}</Label>
          <Input type="text" placeholder={t("emailPlaceholder")}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>{t("party.pancard")}</Label>
          <Input type="text" placeholder={t("pancardPlaceholder")}
            name="pancard"
            value={formik.values.pancard}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pancard && formik.errors.pancard && (
            <p className="text-red-500 text-sm">{formik.errors.pancard}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>{t("party.gstin")}</Label>
          <Input type="text" placeholder={t("gstPlaceholder")}
            name="gst"
            value={formik.values.gst}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.gst && formik.errors.gst && (
            <p className="text-red-500 text-sm">{formik.errors.gst}</p>
          )}
        </div>
        <div className="grid col-span-2 gap-2">
          <Label>{t("party.address")}</Label>
          <Textarea type="text" placeholder={t("addressPlaceholder")}
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm">{formik.errors.address}</p>
          )}
        </div>
      </form>
    </CommonDialog>
  );
};

export default AddEditParty;