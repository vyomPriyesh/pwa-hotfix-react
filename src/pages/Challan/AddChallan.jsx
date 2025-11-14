import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "../../components/ui/scroll-area";
import CommonButton from "../../components/widgets/common_button";
import CommonDialog from "../../components/widgets/common_dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { CircleFadingPlus, ImageUp, Trash2, X } from "lucide-react";
import { CommonTextField } from "../../components/widgets/common_textField";
import DatePiker from "../../components/common/DatePiker";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Textarea } from "../../components/ui/textarea";
import challanservice from "../../service/challan.service";
import CommonDropdown from "../../components/widgets/common_dropdown";
import CommonImgupload from "../../components/widgets/common_imgupload";
import { useSelector } from "react-redux";

const AddChallan = ({ type, open, setClose }) => {

  const { t } = useTranslation("common");
  const { data, loading, error } = useSelector(state => state.dropdown)

  const [imageDialog, setImageDialog] = useState(false);
  const [allIN, setAllIN] = useState([])
  const [formData, setFormData] = useState({
    mall_type: 'comfortable'
  })
  const [errors, setErrors] = useState({})

  const fetchAllIN = async () => {
    const response = await challanservice.allIN()
    if (response) {
      setAllIN(response.data.data?.map(list => ({
        label: list.job_number,
        value: list._id
      })))
    }
  }

  useEffect(() => {
    fetchAllIN()
  }, [])

  useEffect(() => {
    if (type == 'in') {
      const getJobNumber = async () => {
        const response = await challanservice.handleGetJobNumber()
        if (response) {
          setFormData(prev => ({ ...prev, job_number: response.data.data }))
        }
      }
      getJobNumber()
    }
  }, [type])

  const getSingleChallan = async () => {
    const response = await challanservice.handleSingleChallan(formData?.in_id)
    if (response) {
      const inData = response.data.data
      setFormData(prev => ({ ...prev, ...inData }))
    }
  }

  useEffect(() => {
    if (formData?.in_id) {
      getSingleChallan()
    }
  }, [formData?.in_id])

  const handleChange = (name, e) => {
    setFormData(prev => ({ ...prev, [name]: e }))
  }


  // 🔹 Handle cancel
  const handleCancel = () => {
    setClose();
  };

  // 🔹 Handle submit
  const handleSubmit = () => {
    setClose();
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
        isOpen={open}
        onClose={handleCancel}
        size="lg"
        title={type == "in" ? <>{t("challan.in")}</> : <>{t("challan.out")}</>}
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
        <ScrollArea className="h-[calc(100dvh-245px)] -mr-2 pr-2">
          <div className="flex flex-col gap-4">
            <Label htmlFor="designImage">
              <div className="w-fit mx-auto">
                <div className="flex items-center justify-center relative gap-2">
                  <div className="w-fit grid gap-2">
                    <h3 className="text-center">{t("challan.mallImage")}</h3>
                    <div className="h-36 w-32 p-2 shadow-inners rounded-md flex items-center justify-center cursor-pointer">
                      <CommonImgupload value={formData?.mall_image} onChange={(e) => handleChange('mall_image', e)} className='h-full w-full' />
                    </div>
                  </div>
                  <div className="w-fit grid gap-2">
                    <h3 className="text-center">{t("challan.challanImage")}</h3>
                    <div className="h-36 w-32 p-2 shadow-inners rounded-md flex items-center justify-center cursor-pointer">
                      <CommonImgupload value={formData?.challan_image} onChange={(e) => handleChange('challan_image', e)} className='h-full w-full' />
                    </div>
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

            <div className="max-sm:space-y-4 sm:grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>{t("challan.jobNo")}</Label>
                {type == "in" ?
                  <CommonTextField
                    disabled
                    value={formData?.job_number}
                    type="text"
                    placeholder={t("challan.jobNo")}
                  />
                  :
                  <CommonDropdown placeholder={t("challan.jobNo")} value={formData?.in_id} options={allIN} onSelect={(in_id) => handleChange('in_id', in_id)} />
                }
              </div>
              {type == "out" ? (
                <div className="grid gap-2">
                  <Label>{t("design.designNo")}</Label>
                  <CommonTextField
                    type="number"
                    onChange={(e) => handleChange('design_number', e.target.value)}
                    placeholder={t("design.designNo")}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="grid gap-2">
                <Label>{t("design.date")}</Label>
                <DatePiker />
              </div>

              <div className="grid gap-2">
                <Label>{t("challan.challanNo")}</Label>
                <CommonTextField
                  type="text"
                  value={formData?.challan_no}
                  onChange={(e) => handleChange('challan_no', e.target.value)}
                  placeholder={t("challan.challanNo")}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("challan.mall")}</Label>
                <RadioGroup value={formData?.mall_type} onValueChange={(e) => handleChange('mall_type', e)}
                  defaultValue="comfortable"
                  className="border border-border rounded-md h-10 grid grid-cols-2 gap-3 px-3"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem id="r1" value='regular' />
                    <Label htmlFor="r1">{t("challan.regular")}</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem id="r2" value='comfortable' />
                    <Label htmlFor="r2">{t("challan.rf")}</Label>
                  </div>
                </RadioGroup>
              </div>
              {type == "out" ? (
                <div className="grid grid-cols-3 gap-2">
                  <div className="grid gap-2">
                    <Label>{t("challan.finished")}</Label>
                    <CommonTextField
                      type="number"
                      placeholder={t("challan.finished")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("challan.plain")}</Label>
                    <CommonTextField
                      type="number"
                      placeholder={t("challan.plain")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("challan.reject")}</Label>
                    <CommonTextField
                      type="number"
                      placeholder={t("challan.reject")}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="grid gap-2">
                <Label>{t("challan.totalMall")}</Label>
                <RadioGroup value={formData?.total_mall} onValueChange={(e) => handleChange('total_mall', e)}
                  defaultValue="meter"
                  className="border border-border rounded-md h-10 grid grid-cols-2 gap-3 px-3"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="piece" id="m1" />
                    <Label htmlFor="m1">{t("challan.piece")}</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="meter" id="m2" />
                    <Label htmlFor="m2">{t("challan.meter")}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label className="text-transparent">
                  {t("challan.challanNo")}
                </Label>
                <CommonTextField
                  type="text"
                  value={formData?.total_mall_amount}
                  onChange={(e) => handleChange('total_mall_amount', e.target.value)}
                  placeholder={t("challan.totalMall")}
                />
              </div>


              <div className="grid gap-2">
                <Label>{t("design.selectPartyName")}</Label>
                <div className="grid grid-cols-[auto,40px] gap-2">
                  <CommonDropdown placeholder={t("design.selectPartyName")} error={errors?.party} options={data?.data?.parties} onSelect={(party) => handleChange('party', party)} value={formData?.party} />
                  <CommonButton
                    type="button"
                    className="flex items-center justify-center p-0 w-10 h-10"
                  >
                    <CircleFadingPlus className="size-5" />
                  </CommonButton>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>{t("challan.selectIteamCategory")}</Label>
                <div className="grid grid-cols-[auto,40px] gap-2">
                  <CommonDropdown placeholder={t("challan.selectIteamCategory")} error={errors?.category} options={data?.data?.categories} onSelect={(category) => handleChange('category', category)} value={formData?.category} />
                  <CommonButton
                    type="button"
                    className="flex items-center justify-center p-0 w-10 h-10"
                  >
                    <CircleFadingPlus className="size-5" />
                  </CommonButton>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>{t("challan.carrierPerson")}</Label>
                <div className="grid grid-cols-[auto,40px] gap-2">
                  <CommonDropdown placeholder={t("selectCarrierPlaceholder")} error={errors?.carrier_person} options={data?.data?.users} onSelect={(carrier_person) => handleChange('carrier_person', carrier_person)} value={formData?.carrier_person} />
                  <CommonButton
                    type="button"
                    className="flex items-center justify-center p-0 w-10 h-10"
                  >
                    <CircleFadingPlus className="size-5" />
                  </CommonButton>
                </div>
              </div>
              <div className="grid gap-2 col-span-2">
                <Label>{t("design.notes")}</Label>
                <Textarea
                  value={formData?.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  type="text" placeholder={t("design.notes")} />
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
