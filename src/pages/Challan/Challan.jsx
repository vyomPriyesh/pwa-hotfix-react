import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { CommonTextField } from "../../components/widgets/common_textField";
import { CircleFadingPlus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import AddChallan from "./AddChallan";
import InOutDialog from "./InOutDialog";
import challanservice from "../../service/challan.service";
import dateformate from "../../components/widgets/dateformate";
import config from "../../config";
import CommonPagination from "../../components/widgets/common_pagination";

const imagePlaceholder =
  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

const Challan = () => {

  const { t } = useTranslation("common");

  const [allData, setAllData] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [addEdit, setAddEdit] = useState(false)
  const [type, setType] = useState(null)
  const IMG_URL = config.baseImage;
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  const fetchAllINChallan = async (page, size, search) => {
    const response = await challanservice.getAllChallan(page, size, search)
    if (response) {
      setAllData(response.data.data.data)
      setPagination(response.data.data.pagination)
    }
  }

  useEffect(() => {
    fetchAllINChallan(page, size, search)
  }, [page, size, search])

  const handleCloseINout = (type) => {
    setType(type)
    setAddEdit(true)
  }

  const handleAllSubmit = () => {
    setIsOpen(false)
    fetchAllINChallan(page, size, search)
    setAddEdit(false)
  }

  return (
    <div className="grid gap-4 lg:gap-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="h4-bold">{t("design.designList")}</h3>
        <h4 className="h6-bold">{t("design.totalDesign")}: 10</h4>
      </div>

      <Card className="p-4 grid gap-4 lg:gap-6 max-sm:p-1.5">
        <div className="flex items-center justify-between gap-4">
          <div className="lg:max-w-72 w-full grid gap-1">
            <CommonTextField
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full"
            />
          </div>
          <div>
            <Button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2"
            >
              <CircleFadingPlus className="size-5" />
              <span className="max-lg:hidden uppercase"> Add</span>
            </Button>
          </div>
        </div>

        {/* User Data */}
        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2 md:gap-4">
          {allData.length > 0 ? (
            allData.map((item, index) => (
              <Card
                key={index}
                className="shadow-user_card relative overflow-hidden"
              >
                <div className="h-24 lg:h-32 overflow-hidden w-full">
                  <img
                    src={IMG_URL + (item?.in_id ? item?.in_id?.challan_image : item?.challan_image) || imagePlaceholder}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid gap-1 p-2 md:p-3.5">
                  <div className="flex items-center gap-1">
                    <h4 className="p-medium max-sm:text-xs line-clamp-1">{t("challan.challanNo")}: </h4>
                    <h4 className="p-regular max-sm:text-xs line-clamp-1">{item?.in_id ? item?.in_id?.challan_no : item?.challan_no}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <h4 className="p-medium max-sm:text-xs line-clamp-1">{t("design.category")}: </h4>
                    <h4 className="p-regular max-sm:text-xs line-clamp-1">{item?.in_id ? item?.in_id?.category?.name : item?.category?.name}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <h4 className="p-medium max-sm:text-xs line-clamp-1">{t("design.date")}: </h4>
                    <h4 className="p-regular max-sm:text-xs line-clamp-1">{dateformate(item?.createdAt)}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <h4 className="p-medium max-sm:text-xs line-clamp-1">{t("sidebar.party")}: </h4>
                    <h4 className="p-regular max-sm:text-xs line-clamp-1">{item?.in_id ? item?.in_id?.party?.name : item?.party?.name}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <h4 className="p-medium max-sm:text-xs line-clamp-1">{t("challan.jobNo")}: </h4>
                    <h4 className="p-regular max-sm:text-xs line-clamp-1">{item?.job_number}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <h4 className="p-medium max-sm:text-xs line-clamp-1">{t("challan.piece")}: </h4>
                    <h4 className="p-regular max-sm:text-xs line-clamp-1">{item?.in_id ? item?.in_id?.mall_type : item?.mall_type}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <h4 className="p-medium max-sm:text-xs line-clamp-1">{t("challan.cPerson")}: </h4>
                    <h4 className="p-regular max-sm:text-xs line-clamp-1">{item?.in_id ? item?.in_id?.carrier_person?.name : item?.carrier_person?.name}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <h4 className="p-medium max-sm:text-xs line-clamp-1">{t("users.mobile")}: </h4>
                    <h4 className="p-regular max-sm:text-xs line-clamp-1">{item?.in_id ? item?.in_id?.carrier_person?.mobile : item?.carrier_person?.mobile}</h4>
                  </div>
                </div>

                {/* Delete Icon */}
                <div
                  onClick={() => setIsOpen("delete")}
                  className="absolute top-0 right-0 h-10 w-10 rounded-bl-full bg-destructive flex items-start justify-end p-1.5 cursor-pointer"
                >
                  <Trash2 className="text-white size-5" />
                </div>
              </Card>
            ))
          ) : (
            <div className="h-96">
              <p className="text-center text-black/50 font-medium text-xl col-span-full">
                {t("users.noUsersFound")}
              </p>
            </div>
          )}
        </div>
      </Card>
      <div className="flex items-center justify-between max-md:flex-col gap-4">

        <CommonPagination
          currentPage={page}
          totalPages={pagination?.totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          pageSize={size}
          // onPageSizeChange={handleDataSize}
          className=""
        />

      </div>
      <InOutDialog open={isOpen} setClose={() => setIsOpen(false)} onSubmit={handleCloseINout} />
      <AddChallan open={addEdit} setClose={() => setAddEdit(false)} type={type} onSubmit={handleAllSubmit} />
    </div>
  );
};

export default Challan;
