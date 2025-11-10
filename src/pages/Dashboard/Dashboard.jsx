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
      Dashboard
    </div>
  );
};

export default Dashboard;
