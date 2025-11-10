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
import { Trash2 } from "lucide-react";

// Static user data
const staticUsers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    rank: "Gold",
    isActive: true,
    img: "https://i.pravatar.cc/150?img=1",
    isDeleted: false,
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    rank: "Silver",
    isActive: false,
    img: "https://i.pravatar.cc/150?img=2",
    isDeleted: false,
  },
  {
    _id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    rank: "Bronze",
    isActive: true,
    img: "https://i.pravatar.cc/150?img=3",
    isDeleted: false,
  },
  {
    _id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    rank: "Platinum",
    isActive: true,
    img: "https://i.pravatar.cc/150?img=4",
    isDeleted: false,
  },
  {
    _id: "5",
    name: "David Brown",
    email: "david@example.com",
    rank: "Gold",
    isActive: false,
    img: "https://i.pravatar.cc/150?img=5",
    isDeleted: false,
  },
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    rank: "Gold",
    isActive: true,
    img: "https://i.pravatar.cc/150?img=1",
    isDeleted: false,
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    rank: "Silver",
    isActive: false,
    img: "https://i.pravatar.cc/150?img=2",
    isDeleted: false,
  },
  {
    _id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    rank: "Bronze",
    isActive: true,
    img: "https://i.pravatar.cc/150?img=3",
    isDeleted: false,
  },
  {
    _id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    rank: "Platinum",
    isActive: true,
    img: "https://i.pravatar.cc/150?img=4",
    isDeleted: false,
  },
  {
    _id: "5",
    name: "David Brown",
    email: "david@example.com",
    rank: "Gold",
    isActive: false,
    img: "https://i.pravatar.cc/150?img=5",
    isDeleted: false,
  },
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    rank: "Gold",
    isActive: true,
    img: "https://i.pravatar.cc/150?img=1",
    isDeleted: false,
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    rank: "Silver",
    isActive: false,
    img: "https://i.pravatar.cc/150?img=2",
    isDeleted: false,
  },
  {
    _id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    rank: "Bronze",
    isActive: true,
    img: "https://i.pravatar.cc/150?img=3",
    isDeleted: false,
  },
  {
    _id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    rank: "Platinum",
    isActive: true,
    img: "https://i.pravatar.cc/150?img=4",
    isDeleted: false,
  },
  {
    _id: "5",
    name: "David Brown",
    email: "david@example.com",
    rank: "Gold",
    isActive: false,
    img: "https://i.pravatar.cc/150?img=5",
    isDeleted: false,
  },
];

const User = () => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");

  const imagePlaceholder =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  const handleStatusChange = (index, userStatus, user) => {
    // In a real app, this would update the state
    console.log("Status changed:", { index, userStatus, user });
  };

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
    <Card className="p-10 grid gap-6">
      <h3 className="text-xl tab:text-2xl font-bold">{t("users.userList")}</h3>

      <div className="flex items-center justify-between gap-4 max-lg:flex-col">
        <div className="lg:max-w-72 w-full grid gap-1">
          <CommonTextField
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full"
          />
        </div>
      </div>

      <Table className="whitespace-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead className="w-14">{t("users.no")}</TableHead>
            <TableHead className="w-14">{t("users.image")}</TableHead>
            <TableHead>{t("users.name")}</TableHead>
            <TableHead>{t("users.email")}</TableHead>
            <TableHead>{t("users.badge")}</TableHead>
            <TableHead className="w-36 text-center">
              {t("users.status")}
            </TableHead>
            <TableHead className="w-20 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.length > 0 ? (
            userData.map((item, index) => (
              <TableRow key={item._id || index}>
                <TableCell className="ps-4">
                  #{(page - 1) * size + index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 overflow-hidden rounded-lg">
                      <img
                        src={item.img || imagePlaceholder}
                        alt="User"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.rank || "-"}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) =>
                      handleStatusChange(index, value, item)
                    }
                    defaultValue={item.isActive ? "un-block" : "block"}
                  >
                    <SelectTrigger
                      className={`w-36 font-medium ${
                        item.isActive
                          ? "!border-green text-green"
                          : "!border-error text-error"
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="block">{t("users.block")}</SelectItem>
                      <SelectItem value="un-block">
                        {t("users.unBlock")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 justify-center">
                    {/* <EditUser user={item} /> */}
                    <CommonButton
                      variant="outline"
                      className="size-9"
                      onClick={() => setIsOpen("edit")}
                    >
                      <AiFillEdit className="size-5" />
                    </CommonButton>

                    {item.isDeleted ? (
                      <p>Deleted</p>
                    ) : (
                      <CommonButton
                        variant="outline"
                        className="size-9"
                        onClick={() => setIsOpen("delete")}
                      >
                        <Trash2 className="h-5 w-5" />
                      </CommonButton>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="h-40">
              <TableCell
                colSpan={8}
                className="text-center text-black/50 font-medium text-xl"
              >
                {t("users.noUsersFound")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
    </Card>
  );
};

export default User;
