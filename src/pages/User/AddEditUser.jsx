import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { Checkbox } from "../../components/ui/checkbox";
import { ScrollArea } from "../../components/ui/scroll-area";
import DatePiker from "../../components/common/DatePiker";
import WorkType from "../../components/common/WorkType";
import { Button } from "../../components/ui/button";
import { CircleFadingPlus } from "lucide-react";
import { CommonTextField } from "../../components/widgets/common_textField";
import CommonDropdown from "../../components/widgets/common_dropdown";
import CommonImgupload from "../../components/widgets/common_imgupload";

import { useSelector } from "react-redux";

const AddEditUser = ({ user, isOpen, setIsOpen }) => {

  const { t } = useTranslation("common");
  const { data, loading, error } = useSelector(state => state.dropdown)

  // 🔹 Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    profile_image: user?.profile_image || "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
    email: user?.email || "",
    mobile: user?.mobile || "",
    dob: user?.dob || null,
    password: "",
    confirmPassword: "",
    role: user?.role || "",
    work_type: user?.work_type || "",
    fromTime: user?.fromTime || "",
    toTime: user?.toTime || "",
    options: {
      one: false,
      two: false,
      three: false,
    },
  });
  const [errors, setErrors] = useState({})

  // 🔹 Separate state for WorkType Dialog
  const [isWorkTypeOpen, setIsWorkTypeOpen] = useState(false);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle checkbox changes
  const handleCheckboxChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [id]: !prev.options[id],
      },
    }));
  };

  // 🔹 Handle date change from DatePicker
  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, dob: date }));
  };

  // 🔹 Handle submit
  const handleSubmit = () => {
    let newErrors = {}
    if (!formData?.name) {
      newErrors.name = 'Name is Required'
    }
    if (!formData?.email) {
      newErrors.email = 'Email is Required'
    }
    if (!formData?.mobile) {
      newErrors.mobile = 'Mobile is Required'
    }
    if (!formData?.password) {
      newErrors.password = 'Password is Required'
    }
    if (!formData?.work_type) {
      newErrors.work_type = 'Work Type is Required'
    }
    setErrors(newErrors)
  };

  // 🔹 Handle cancel
  const handleCancel = () => {
    setIsOpen("");
  };

  // 🔹 Open Work Type Dialog
  const handleAddWorkType = () => {
    setIsWorkTypeOpen(true);
  };

  const roles = [
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

  return (
    <>
      {/* 🔹 Main Add/Edit User Dialog */}
      <CommonDialog
        isOpen={isOpen}
        onClose={handleCancel}
        size="lg"
        title={t("users.editBadge")}
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
            {/* Profile Image Upload */}
            <div className="grid gap-3 col-span-2 mx-auto text-center">
              <Label>{t("users.image")}</Label>

              <CommonImgupload value={formData?.profile_image} onChange={(e) => setFormData(prev => ({ ...prev, profile_image: e }))} />
            </div>

            {/* Name */}
            <div className="grid gap-2">
              <CommonTextField label={t("users.name")}
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                placeholder={t("usernamePlaceholder")}
                error={errors?.name}
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <CommonTextField label={t("users.email")}
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                placeholder={t("emailPlaceholder")}
                error={errors?.email}
              />
            </div>

            {/* Mobile */}
            <div className="grid gap-2">
              <CommonTextField label={t("users.email")}
                type="number"
                name="mobile"
                value={formData.mobile}
                placeholder={t("mobilePlaceholder")}
                onChange={handleChange}
                error={errors?.mobile}
              />
            </div>

            {/* Date of Birth */}
            <div className="grid gap-2">
              <Label>{t("users.dob")}</Label>
              <DatePiker value={formData.dob} onChange={handleDateChange} />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <CommonTextField label={t("password")}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("passwordPlaceholder")}
                isPassword
                error={errors?.password}
              />
            </div>
            <div className="grid gap-2">
              <CommonTextField label={t("confirmPassword")}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t("confirmPasswordPlaceholder")}
                isPassword
                error={errors?.confirmPassword}
              />
            </div>

            {/* Role */}
            <div className="grid gap-2">
              <Label>{t("users.role")}</Label>
              <CommonDropdown placeholder={t("selectRolePlaceholder")} options={roles} value={formData.role} onSelect={(role) => setFormData((p) => ({ ...p, role }))} />
            </div>

            {/* Work Type */}
            <div className="grid gap-2">
              <Label>{t("users.workType")}</Label>
              <div className="grid grid-cols-[auto,40px] gap-2">
                <CommonDropdown placeholder={t("selectWorkTypePlaceholder")} options={data?.data?.work_type} value={formData.work_type} onSelect={(work_type) => setFormData((p) => ({ ...p, work_type }))} />
                <Button
                  type="button"
                  onClick={handleAddWorkType}
                  className="flex items-center justify-center p-0 w-10 h-10"
                >
                  <CircleFadingPlus className="size-5" />
                </Button>
              </div>
            </div>

            {/* Checkboxes */}
            {["one", "two"].map((key) => (
              <div
                key={key}
                className="flex items-center gap-2 col-span-2 h-10 border border-border rounded-md px-3"
              >
                <Checkbox
                  id={key}
                  checked={formData.options[key]}
                  onCheckedChange={() => handleCheckboxChange(key)}
                />
                <Label className="cursor-pointer" htmlFor={key}>
                  {t("users.hideChallange")}
                </Label>
              </div>
            ))}

            {/* Time */}
            <div className="grid gap-2">
              <CommonTextField label={t("users.fromTime")}
                type="text"
                name="work_from"
                placeholder="HH:MM:SS"
                value={formData.work_from}
                onChange={handleChange}
                error={errors?.work_from}
              />
            </div>
            <div className="grid gap-2">
              <CommonTextField label={t("users.toTime")}
                type="text"
                name="work_to"
                placeholder="HH:MM:SS"
                value={formData.work_to}
                onChange={handleChange}
                error={errors?.work_to}
              />
            </div>
          </div>
        </ScrollArea>
      </CommonDialog>

      {/* 🔹 Separate Work Type Dialog */}
      <WorkType
        isOpen={isWorkTypeOpen}
        setIsOpen={setIsWorkTypeOpen}
        isEdit={false}
      />
    </>
  );
};

export default AddEditUser;
