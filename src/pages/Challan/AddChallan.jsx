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
import AuthService from "../../service/auth.service";
import config from "../../config";

const AddChallan = ({ type, open, onSubmit, setClose }) => {

  const { t } = useTranslation("common");
  const { data, loading, error } = useSelector(state => state.dropdown)

  const [imageDialog, setImageDialog] = useState(false);
  const [allIN, setAllIN] = useState([])
  const [formData, setFormData] = useState({
    mall_type: 'comfortable'
  })
  const [errors, setErrors] = useState({})
  const IMG_URL = config.baseImage;

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
      setFormData(prev => ({
        ...prev,
        ...inData,
        mall_image_value: IMG_URL + inData?.mall_image,
        challan_image_value: IMG_URL + inData?.challan_image,
      }))
    }
  }

  useEffect(() => {
    if (formData?.in_id) {
      getSingleChallan()
    }
  }, [formData?.in_id])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }))
  };

  const handleImage = async (e, key) => {
    const file = e.target.files[0];
    const formData = new FormData()
    formData.append("images", file)
    const res = await AuthService.imageUploadwithurl(formData)
    setFormData(prev => ({ ...prev, [key + '_value']: IMG_URL + res.data.data[0], [key]: res.data.data[0] }))
  }

  // 🔹 Handle submit
  const handleSubmit = async () => {
    let newErrors = {};
    if (!formData?.mall_image) {
      newErrors.mall_image = 'Mall Image is Required'
    }
    if (!formData?.challan_image) {
      newErrors.challan_image = 'Challan Image is Required'
    }
    if (!formData?.challan_no) {
      newErrors.challan_no = 'Challan Number is Required'
    }
    if (!formData?.total_mall_amount) {
      newErrors.total_mall_amount = 'Total Mall Amount is Required'
    }
    if (!formData?.category) {
      newErrors.category = 'Category is Required'
    }
    if (!formData?.party) {
      newErrors.party = 'Party is Required'
    }
    if (!formData?.carrier_person) {
      newErrors.carrier_person = 'Carrier Person is Required'
    }
    if (type == 'out') {
      if (formData?.finished == null) {
        newErrors.finished = 'Finished is Required';
      }
      if (formData?.plain == null) {
        newErrors.plain = 'Plain is Required';
      }
      if (formData?.rejected == null) {
        newErrors.rejected = 'Rejected is Required';
      }
      if ((Number(formData?.finished) + Number(formData?.plain) + Number(formData?.rejected)) > formData.pending) {
        alert("Total of Three Mall type more then previous pending Total Mall")
        return
      }
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setErrors({})
      formData.type = type
      if (type == 'out') {
        formData.pending = Number(formData.pending) - (Number(formData?.finished) + Number(formData?.plain) + Number(formData?.rejected))
      } else {
        formData.pending = formData.total_mall_amount
      }
      const res = await challanservice.addChallan(formData)
      if (res.data.success) {
        onSubmit()
      }
    }
  };

  const handleCancel = () => {
    setClose()
  }

  console.log(errors)

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
                      <Label
                        htmlFor="mall_image"
                      >
                        {formData?.mall_image_value ?
                          <img
                            src={formData?.mall_image_value}
                            className="w-full h-full object-cover bg-center"
                          />
                          :
                          <ImageUp className="md:size-[36px] opacity-50" />}
                      </Label>
                      <Input
                        type="file"
                        id="mall_image"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImage(e, 'mall_image')}
                      />
                    </div>
                    {errors?.mall_image && <p className="text-red-500">{errors?.mall_image}</p>}
                  </div>
                  <div className="w-fit grid gap-2">
                    <h3 className="text-center">{t("challan.challanImage")}</h3>
                    <div className="h-36 w-32 p-2 shadow-inners rounded-md flex items-center justify-center cursor-pointer">
                      <Label
                        htmlFor="challan_image"
                      >
                        {formData?.challan_image_value ?
                          <img
                            src={formData?.challan_image_value}
                            className="w-full h-full object-cover bg-center"
                          />
                          :
                          <ImageUp className="md:size-[36px] opacity-50" />}
                      </Label>
                      <Input
                        type="file"
                        id="challan_image"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImage(e, 'challan_image')}
                      />
                    </div>
                    {errors?.challan_image && <p className="text-red-500">{errors?.challan_image}</p>}
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
                  <CommonDropdown placeholder={t("challan.jobNo")} value={formData?.in_id} options={allIN} onSelect={(in_id) => setFormData((p) => ({ ...p, in_id }))} />
                }
              </div>
              {type == "out" ? (
                <div className="grid gap-2">
                  <Label>{t("design.designNo")}</Label>
                  <CommonTextField
                    type="number"
                    name='design_number'
                    onChange={handleChange}
                    placeholder={t("design.designNo")}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="grid gap-2">
                <Label>{t("design.date")}</Label>
                <DatePiker disabled={true} />
              </div>

              <div className="grid gap-2">
                <Label>{t("challan.challanNo")}</Label>
                <CommonTextField
                  type="text"
                  name='challan_no'
                  value={formData?.challan_no}
                  onChange={handleChange}
                  placeholder={t("challan.challanNo")}
                  error={errors?.challan_no}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("challan.mall")}</Label>
                <RadioGroup value={formData?.mall_type} onValueChange={(mall_type) => setFormData((p) => ({ ...p, mall_type }))}
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
                      name='finished'
                      onChange={handleChange}
                      placeholder={t("challan.finished")}
                      error={errors?.finished}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("challan.plain")}</Label>
                    <CommonTextField
                      type="number"
                      name='plain'
                      onChange={handleChange}
                      placeholder={t("challan.plain")}
                      error={errors?.plain}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("challan.reject")}</Label>
                    <CommonTextField
                      type="number"
                      name='rejected'
                      onChange={handleChange}
                      placeholder={t("challan.reject")}
                      error={errors?.rejected}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="grid gap-2">
                <Label>{t("challan.totalMall")}</Label>
                <RadioGroup value={formData?.total_mall} onValueChange={(total_mall) => setFormData((p) => ({ ...p, total_mall }))}
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
                  name='total_mall_amount'
                  value={formData?.total_mall_amount}
                  onChange={handleChange}
                  placeholder={t("challan.totalMall")}
                  error={errors?.total_mall_amount}
                />
              </div>


              <div className="grid gap-2">
                <Label>{t("design.selectPartyName")}</Label>
                <div className="grid grid-cols-[auto,40px] gap-2">
                  <CommonDropdown
                    placeholder={t("design.selectPartyName")}
                    error={errors?.party}
                    options={data?.data?.parties}
                    onSelect={(party) => setFormData((p) => ({ ...p, party }))}
                    value={formData?.party}

                  />
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
                  <CommonDropdown
                    placeholder={t("challan.selectIteamCategory")}
                    error={errors?.category}
                    options={data?.data?.categories}
                    onSelect={(category) => setFormData((p) => ({ ...p, category }))}
                    value={formData?.category}
                  />
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
                  <CommonDropdown
                    placeholder={t("selectCarrierPlaceholder")}
                    error={errors?.carrier_person}
                    options={data?.data?.users}
                    onSelect={(carrier_person) => setFormData((p) => ({ ...p, carrier_person }))}
                    value={formData?.carrier_person}
                  />
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
                  name='notes'
                  value={formData?.notes}
                  onChange={handleChange}
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
