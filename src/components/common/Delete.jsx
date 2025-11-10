import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { PiSealWarningFill } from "react-icons/pi";

const Delete = ({
  bannerDelete,
  postDelete,
  DeletePost,
  commentDelete,
  DeleteComment,
  handleDeleteBanner,
}) => {
  return (
    <Dialog>
      {/* Banner */}
      {bannerDelete && (
        <DialogTrigger className="py-2.5 px-3 bg-white rounded-lg cursor-pointer">
          <p className="leading-none font-medium">Delete</p>
        </DialogTrigger>
      )}
      {/* Post */}
      {DeletePost && (
        <>
          {postDelete ? (
            <DialogTrigger className="h-10 w-10 p-0 border border-error/80 rounded-md hover:bg-error/75 text-error/80 hover:text-white duration-150 cursor-pointer flex items-center justify-center">
              <Trash2 className="h-5 w-5" />
            </DialogTrigger>
          ) : (
            <p className="text-error text-sm">Deleted</p>
          )}
        </>
      )}
      {/* Comment */}
      {DeleteComment && (
        <>
          {commentDelete ? (
            <DialogTrigger className="py-0.5 px-2 cursor-pointer text-error border border-error bg-error/15 hover:bg-error/25 duration-200 font-medium w-fit text-sm rounded">
              Delete
            </DialogTrigger>
          ) : (
            <p className="text-error text-sm">Deleted</p>
          )}
        </>
      )}
      <DialogContent className="sm:max-w-[425px] max-w-[calc(100vw-2rem)]">
        <div className="flex items-center justify-center">
          <PiSealWarningFill className="lg:text-7xl text-5xl text-destructive" />
        </div>
        <DialogHeader className="py-5">
          <DialogTitle className="text-2xl text-center">
            Are you sure?
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Are you sure you want to delete this item?
          </p>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleDeleteBanner}
              type="button"
              variant="destructive"
              className="w-full"
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
