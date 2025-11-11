import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { AiFillEdit } from "react-icons/ai";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useTranslation } from "react-i18next";
import CommonPagination from "../../components/widgets/common_pagination";
import { CommonTextField } from "../../components/widgets/common_textField";
import CommonButton from "../../components/widgets/common_button";
import Delete from "./Delete";
import EditUser from "./EditUser";
import { CircleFadingPlus, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";

// Static user data
const staticUsers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "2",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "3",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "4",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "5",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "6",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "7",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "8",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "9",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "10",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "11",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "12",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "13",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: "14",
    name: "John Doe",
    email: "john@example.com",
    img: "https://i.pravatar.cc/150?img=1",
  },
];

const imagePlaceholder =
  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

const Category = () => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");


  // Filter users based on search
  const filteredUsers = staticUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / size);

  // Get paginated users
  const userData = filteredUsers.slice((page - 1) * size, page * size);

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
          {userData.length > 0 ? (
            userData.map((item, index) => (
              <Card key={item._id || index} className="p-4 shadow-user_card">
                  <div className="sm:text-center">
                    <h4 className="h6-bold">{item.name}</h4>
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
        {totalUsers > size && (
          <CommonPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
            pageSize={size}
            onPageSizeChange={handleDataSize}
            className=""
          />
        )}
      </div>

      <Delete
        isOpen={isOpen === "delete"}
        setIsOpen={setIsOpen}
        isDelete={isOpen}
      />
      <EditUser
        isOpen={isOpen === "edit"}
        setIsOpen={setIsOpen}
        isEdit={isOpen}
      />
    </div>
  );
};

export default Category;
