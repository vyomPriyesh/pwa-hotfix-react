import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { useTranslation } from "react-i18next";
import CommonPagination from "../../components/widgets/common_pagination";
import { CommonTextField } from "../../components/widgets/common_textField";
import Delete from "./Delete";
import { CircleFadingPlus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import masterService from "../../service/master.service";
import AddEditCategory from "./AddEditCategory";

const Category = () => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedData, setSelectedData] = useState()

  const [categoryList, setCategoryList] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  const fetchData = async (page, size, search) => {
    const response = await masterService.getCategoryList(page, size, search)
    if (response) {
      setCategoryList(response?.data?.data?.data || [])
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
      await masterService.deleteCategory(selectedData?._id)
      setIsOpen("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="grid gap-4 lg:gap-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="h4-bold">{t("users.userList")}</h3>
        <h4 className="h6-bold">{t("dashboard.totalUser")}: {pagination?.total}</h4>
      </div>

      <Card className="p-4 grid gap-4 lg:gap-6">
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
            <Button onClick={() => {
              setIsOpen("add")
              setSelectedData('')
            }}
              className="flex items-center gap-2">
              <CircleFadingPlus className="size-5" />
              <span className="max-lg:hidden uppercase"> Add</span>
            </Button>
          </div>
        </div>

        {/* User Data */}
        <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          {categoryList?.length > 0 ? (
            categoryList?.map((item, index) => (
              <Card key={item._id || index} className="p-4 shadow-user_card relative" >
                <div className="sm:text-center cursor-pointer" onClick={() => {
                  setSelectedData(item)
                  setIsOpen('add')
                }}
                >
                  <h4 className="h6-bold">{item?.name}</h4>
                </div>

                <div onClick={() => {
                  setIsOpen("delete")
                  setSelectedData(item)
                }}
                  className="absolute z-10 top-0 right-0 h-10 w-10 rounded-bl-full bg-destructive flex items-start justify-end p-1.5 cursor-pointer">
                  <Trash2 className="text-white size-5" />
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-black/50 font-medium text-xl col-span-full">
              {t("users.noUsersFound")}
            </p>
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

      <Delete
        isOpen={isOpen === "delete"}
        setIsOpen={setIsOpen}
        isDelete={isOpen}
        handleDelete={handleDelete}
      />
      <AddEditCategory
        isOpen={isOpen === "add"}
        setIsOpen={setIsOpen}
        isEdit={isOpen}
        selectedData={selectedData}
      />
    </div>
  );
};

export default Category;
