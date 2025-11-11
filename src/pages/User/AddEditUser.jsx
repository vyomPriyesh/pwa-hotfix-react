import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { Checkbox } from "../../components/ui/checkbox";
import { ScrollArea } from "../../components/ui/scroll-area";
import RoleDialog from "../../components/common/RoleDialog";
import WorkDialog from "../../components/common/WorkDialog";
import DatePiker from "../../components/common/DatePiker";
import WorkType from "../../components/common/WorkType";
import { Button } from "../../components/ui/button";
import { CircleFadingPlus } from "lucide-react";
import { CommonTextField } from "../../components/widgets/common_textField";

const AddEditUser = ({ user, isOpen, setIsOpen }) => {
  const { t } = useTranslation("common");

  // 🔹 Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    dob: user?.dob || null,
    password: "",
    confirmPassword: "",
    role: user?.role || "",
    workType: user?.workType || "",
    fromTime: user?.fromTime || "",
    toTime: user?.toTime || "",
    options: {
      one: false,
      two: false,
      three: false,
    },
  });

  // 🔹 Image upload state
  const [profileImage, setProfileImage] = useState(
    user?.profileImage ||
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80"
  );

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

  // 🔹 Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setFormData((prev) => ({ ...prev, profileFile: file }));
    }
  };

  // 🔹 Handle date change from DatePicker
  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, dob: date }));
  };

  // 🔹 Handle submit
  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    setIsOpen("");
  };

  // 🔹 Handle cancel
  const handleCancel = () => {
    setIsOpen("");
  };

  // 🔹 Open Work Type Dialog
  const handleAddWorkType = () => {
    setIsWorkTypeOpen(true);
  };

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
              <Label
                htmlFor="profiles"
                className="h-16 w-16 lg:h-20 lg:w-20 xxl:h-24 xxl:w-24 overflow-hidden border border-border rounded-md cursor-pointer flex items-center justify-center"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover bg-center"
                />
              </Label>
              <Input
                type="file"
                id="profiles"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Name */}
            <div className="grid gap-2">
              <Label>{t("users.name")}</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                placeholder={t("usernamePlaceholder")}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label>{t("users.email")}</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                placeholder={t("emailPlaceholder")}
                onChange={handleChange}
              />
            </div>

            {/* Mobile */}
            <div className="grid gap-2">
              <Label>{t("users.mobile")}</Label>
              <Input
                type="number"
                name="mobile"
                value={formData.mobile}
                placeholder={t("mobilePlaceholder")}
                onChange={handleChange}
              />
            </div>

            {/* Date of Birth */}
            <div className="grid gap-2">
              <Label>{t("users.dob")}</Label>
              <DatePiker value={formData.dob} onChange={handleDateChange} />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <CommonTextField  label={t("password")}
                  type="password"
                  name="password"
                  // value={formik.values.password}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  placeholder={t("passwordPlaceholder")}
                  // isPassword
                  // error={formik.touched.password && formik.errors.password} 
                  />
            </div>
            <div className="grid gap-2">
              <CommonTextField  label={t("confirmPassword")}
                  type="password"
                  name="password"
                  // value={formik.values.password}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  placeholder={t("confirmPasswordPlaceholder")}
                  // isPassword
                  // error={formik.touched.password && formik.errors.password} 
                  />
            </div>

            {/* Role */}
            <div className="grid gap-2">
              <Label>{t("users.role")}</Label>
              <RoleDialog
                selected={formData.role}
                onSelect={(role) => setFormData((p) => ({ ...p, role }))}
              />
            </div>

            {/* Work Type */}
            <div className="grid gap-2">
              <Label>{t("users.workType")}</Label>
              <div className="grid grid-cols-[auto,40px] gap-2">
                <WorkDialog
                  selected={formData.workType}
                  onSelect={(workType) =>
                    setFormData((p) => ({ ...p, workType }))
                  }
                />
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
            {["one", "two", "three"].map((key) => (
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
              <Label>{t("users.fromTime")}</Label>
              <Input
                type="text"
                name="fromTime"
                placeholder="HH:MM:SS"
                value={formData.fromTime}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label>{t("users.toTime")}</Label>
              <Input
                type="text"
                name="toTime"
                placeholder="HH:MM:SS"
                value={formData.toTime}
                onChange={handleChange}
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
