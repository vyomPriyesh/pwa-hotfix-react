import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { FaComments, FaUsers } from "react-icons/fa6";
import { MdPhotoLibrary } from "react-icons/md";
import DashboardService from "../../service/dashboard.service";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useTranslation } from "react-i18next";

// Simulated Enum (FilterType)
const FilterType = {
  ALL: "all",
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
};

const Dashboard = () => {
  const { t } = useTranslation("common");
  const [loaders, setLoaders] = useState(true);
  const [dashboard, setDashboard] = useState({});
  const [filter, setFilter] = useState(FilterType.ALL);

  useEffect(() => {
    setLoaders(true);
    setTimeout(() => {
      setLoaders(false);
    }, 2000);
  }, []);

  return (
    <div className="grid gap-6">
      <Select
        onValueChange={(value) => setFilter(value)}
        defaultValue={FilterType.ALL}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={FilterType.ALL}>{t("dashboard.all")}</SelectItem>
          <SelectItem value={FilterType.DAY}>{t("dashboard.day")}</SelectItem>
          <SelectItem value={FilterType.WEEK}>{t("dashboard.week")}</SelectItem>
          <SelectItem value={FilterType.MONTH}>
            {t("dashboard.month")}
          </SelectItem>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Users */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-start justify-between">
            <div className="grid gap-1">
              <p className="leading-none">{t("dashboard.totalUser")}</p>
              {loaders ? (
                <Skeleton className="h-10 w-24" />
              ) : (
                <h5 className="text-xl lg:text-2xl font-medium text-blue">
                  {dashboard?.totalUser || 0}
                </h5>
              )}
            </div>
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-blue/20">
              <FaUsers className="text-blue text-2xl" />
            </div>
          </div>
        </Card>

        {/* Posts */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-start justify-between">
            <div className="grid gap-1">
              <p className="leading-none">{t("dashboard.totalPost")}</p>
              {loaders ? (
                <Skeleton className="h-10 w-24" />
              ) : (
                <h5 className="text-xl lg:text-2xl font-medium text-purpal">
                  {dashboard?.totalPost || 0}
                </h5>
              )}
            </div>
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-purpal/20">
              <MdPhotoLibrary className="text-purpal text-2xl" />
            </div>
          </div>
        </Card>

        {/* Comments */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-start justify-between">
            <div className="grid gap-1">
              <p className="leading-none">{t("dashboard.totalComment")}</p>
              {loaders ? (
                <Skeleton className="h-10 w-24" />
              ) : (
                <h5 className="text-xl lg:text-2xl font-medium text-yellow">
                  {dashboard?.totalComment || 0}
                </h5>
              )}
            </div>
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-yellow/20">
              <FaComments className="text-yellow text-2xl" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
