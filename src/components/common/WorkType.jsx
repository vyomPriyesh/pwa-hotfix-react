import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { CommonTextField } from "../widgets/common_textField";
import masterService from "../../service/master.service";
import { useDispatch } from "react-redux";
import { fetchAllDropdown } from "../../store/slice/dropdown";

const WorkType = ({ user, isOpen, setIsOpen }) => {

  const { t } = useTranslation("common");
  const dispatch = useDispatch()

  const [name, setName] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    if(!name){
      setError('Please Enter Name')
    }
    const payload = {
      name: name
    }
    const response = await masterService.addWorkType(payload)
    if (response) {
      setIsOpen("")
       dispatch(fetchAllDropdown())
    }
  }


  return (
    <CommonDialog
      isOpen={isOpen}
      onClose={() => setIsOpen("")}
      size="sm"
      title={t("users.editBadge")}
      footer={
        <div className="flex gap-2">
          <CommonButton variant="outline" onClick={() => setIsOpen("")}>
            {t("cancel")}
          </CommonButton>
          <CommonButton onClick={handleSubmit}>
            {t("Create")}
          </CommonButton>
        </div>
      }
    >
      <div className="grid gap-2">
        <CommonTextField
          label={t("users.name")}
          type="text"
          name="worktype"
          placeholder={t("usernamePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        error={error}
        />
      </div>
    </CommonDialog>
  )
}

export default WorkType
