import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { CommonTextField } from "../../components/widgets/common_textField";
import { CircleFadingPlus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import AddEditDesign from "./AddEditDesign";
import designService from "../../service/design.service";
import CommonPagination from "../../components/widgets/common_pagination";
import Delete from "../Category/Delete";

const imagePlaceholder =
  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

const Design = () => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [List, setList] = useState([]);
  const [selectedData, setSelectedData] = useState()

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  const fetchData = async (page, size, search) => {
    const response = await designService.getDesignList(page, size, search)
    if (response) {
      setList(response?.data?.data?.data || [])
      setPagination(response?.data?.data?.pagination);
    }
  }

  useEffect(() => {
    fetchData(page, size, search)
  }, [page, size, search, isOpen])

  const handleDataSize = (value) => {
    setSize(value);
    setPage(1);
  };

  const handleDelete = async () => {
    try {
      await designService.deleteDesign(selectedData?._id)
      setIsOpen("");
      fetchData(page, size, search)
    } catch (error) {
      console.log(error);
    }
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
              onClick={() => {
                setSelectedData('')
                setIsOpen("edit")
              }}
              className="flex items-center gap-2"
            >
              <CircleFadingPlus className="size-5" />
              <span className="max-lg:hidden uppercase"> Add</span>
            </Button>
          </div>
        </div>

        {/* User Data */}
        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          {List.length > 0 ? (
            List.map((item, index) => (
              <Card
                key={index}
                className="shadow-user_card relative overflow-hidden cursor-pointer"
              >
                <div
                  onClick={() => {
                    setSelectedData(item)
                    setIsOpen("edit")
                  }}
                >
                  <div className="h-24 lg:h-32 overflow-hidden w-full">
                    <img
                      src={item?.images[0] || imagePlaceholder}
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="grid gap-1 p-3.5">
                    <div className="flex items-center gap-1">
                      <h4 className="p-medium">Design No.: </h4>
                      <h4 className="p-regular">{item?.design_no}</h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <h4 className="p-medium">Party: </h4>
                      <h4 className="p-regular">{item?.party?.name}</h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <h4 className="p-medium">Category: </h4>
                      <h4 className="p-regular">{item?.category?.name}</h4>
                    </div>
                    {/* <div className="flex items-center gap-1">
                    <h4 className="p-medium">Rate: </h4>
                    <h4 className="p-regular">₹{item?.rate}</h4>
                  </div> */}
                  </div>
                </div>

                <div
                  onClick={() => {
                    setIsOpen("delete")
                    setSelectedData(item)
                  }}
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
          onPageSizeChange={handleDataSize}
          className=""
        />

      </div>

      <AddEditDesign
        isOpen={isOpen === "edit"}
        setIsOpen={setIsOpen}
        isEdit={isOpen}
        selectedData={selectedData}
      />
      <Delete
        isOpen={isOpen === "delete"}
        setIsOpen={setIsOpen}
        isDelete={isOpen}
        handleDelete={handleDelete}
      />


    </div>
  );
};

export default Design;
