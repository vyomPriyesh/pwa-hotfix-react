import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { useTranslation } from "react-i18next";
import CommonPagination from "../../components/widgets/common_pagination";
import { CommonTextField } from "../../components/widgets/common_textField";
import Delete from "./Delete";
import { CircleFadingPlus, MapPin, Phone } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import EditParty from "./EditParty";
import masterService from "../../service/master.service";

const Party = () => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");

  const [partyList, setPartyList] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  const fetchData = async (page, size, search) => {
    const response = await masterService.getPartyList(page, size, search)
    if (response) {
      setPartyList(response?.data?.data?.data || [])
      setPagination(response?.data?.data?.pagination);
    }
  }

  useEffect(() => {
    fetchData(page, size, search)
  }, [page, size, search])

  const handleDataSize = (value) => {
    setSize(value);
    setPage(1);
  };

  return (
    <div className="grid gap-4 lg:gap-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="h4-bold">{t("users.userList")}</h3>
        <h4 className="h6-bold">{t("dashboard.totalUser")}: 14</h4>
      </div>

      <Card className="p-4 grid gap-4 lg:gap-6 bg-mainBackground">
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
              onClick={() => setIsOpen("edit")}
              className="flex items-center gap-2"
            >
              <CircleFadingPlus className="size-5" />
              <span className="max-lg:hidden uppercase"> Add</span>
            </Button>
          </div>
        </div>

        {/* User Data */}
        <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {partyList.length > 0 ? (
            partyList.map((item, index) => (
              <Card
                key={item._id || index}
                className="p-4"
              >
                <div className="grid gap-4 overflow-hidden">
                  <div className="flex sm:flex-col items-center gap-4">
                    <div className="h-10 w-10 sm:h-16 sm:w-16 rounded-full border border-border flex items-center justify-center">
                      <span className="h5-bold !font-bold uppercase">{item?.name[0]}</span>
                    </div>
                    <div className="sm:text-center grid gap-1">
                      <h4 className="h5-bold">{item?.contact_person}</h4>
                      <p className="p-regular text-primary/70">{item?.name}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-[97.5px,160px] gap-3">
                    <div className="flex items-center gap-1.5 whitespace-nowrap w-fit">
                      <Phone className="size-4 text-primary/50" />
                      <p className="p-regular text-primary/70 line-clamp-1">
                        {item?.mobile}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap w-fit">
                      <MapPin className="size-4 text-primary/50" />
                      <p className="p-regular text-primary/70 line-clamp-1">
                        {item?.address}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-primary/50 font-medium text-xl col-span-full">
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
      />
      <EditParty
        isOpen={isOpen === "edit"}
        setIsOpen={setIsOpen}
        isEdit={isOpen}
      />
    </div>
  );
};

export default Party;
