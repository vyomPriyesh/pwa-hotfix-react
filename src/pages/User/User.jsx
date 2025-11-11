import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { useTranslation } from "react-i18next";
import CommonPagination from "../../components/widgets/common_pagination";
import { CommonTextField } from "../../components/widgets/common_textField";
import Delete from "./Delete";
import { CircleFadingPlus, Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import userService from "../../service/user.service";
import AddEditUser from "./AddEditUser";

const imagePlaceholder =
  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

const User = () => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });
  
  const fetchUserData = async (page, size, search) => {
    const response = await userService.getUserList(page, size, search)
    if (response) {
      setUserList(response?.data?.data?.data || [])
      setPagination(response?.data?.data?.pagination);
    }
  }

  useEffect(() => {
    fetchUserData(page, size, search)
  }, [page, size, search])

  const handleDataSize = (value) => {
    setSize(value);
    setPage(1);
  };

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
            <Button onClick={() => setIsOpen("edit")} className="flex items-center gap-2">
              <CircleFadingPlus className="size-5" />
              <span className="max-lg:hidden uppercase"> Add</span>
            </Button>
          </div>
        </div>

        {/* User Data */}
        <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          {userList.length > 0 ? (
            userList.map((item, index) => (
              <Card key={item._id || index} className="p-4 shadow-user_card relative overflow-hidden">
                <div className="flex sm:flex-col items-center gap-4">
                  <div className="h-10 w-10 sm:h-16 sm:w-16 lg:h-24 lg:w-24 overflow-hidden rounded-lg">
                    <img
                      src={item?.img || imagePlaceholder}
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="sm:text-center">
                    <h4 className="h5-bold">{item?.name}</h4>
                    <p className="p-regular text-black/70">{item?.email || "email not found"}</p>
                  </div>
                </div>

                {/* Delete Icon */}
                <div onClick={() => setIsOpen("delete")} className="absolute top-0 right-0 h-10 w-10 rounded-bl-full bg-destructive flex items-start justify-end p-1.5 cursor-pointer">
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

      <AddEditUser
        isOpen={isOpen === "edit"}
        setIsOpen={setIsOpen}
        isEdit={isOpen}
      />

      <Delete
        isOpen={isOpen === "delete"}
        setIsOpen={setIsOpen}
        isDelete={isOpen}
      />
    </div>
  );
};

export default User;
