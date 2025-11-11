import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Trash2 } from "lucide-react";
import { PiSealWarningFill } from "react-icons/pi";
import CommonDialog from "../../components/widgets/common_dialog";
import CommonButton from "../../components/widgets/common_button";
import { useTranslation } from "react-i18next";

const Delete = ({ isOpen, setIsOpen, isDelete, handleDelete }) => {
  const { t } = useTranslation("common");

  return (
    <CommonDialog isOpen={isOpen} onClose={() => setIsOpen("")}>
      <div className="flex items-center justify-center">
        <PiSealWarningFill className="lg:text-7xl text-5xl text-destructive" />
      </div>
      <DialogHeader className="py-5">
        <DialogTitle className="text-2xl text-center">
          {t("deleteDialog.areYouSure")}
        </DialogTitle>
        <p className="text-center text-sm text-muted-foreground mt-4">
          {t("deleteDialog.areYouSureDelete")}
        </p>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" className="w-full">
            {t("close")}
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            onClick={handleDelete}
            type="button"
            variant="destructive"
            className="w-full"
          >
            {t("delete")}
          </Button>
        </DialogClose>
      </DialogFooter>
    </CommonDialog>
  );
};

export default Delete;
