import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const Paginations = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];

    // Example: show max 5 pages at once
    const maxPagesToShow = 5;
    let start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let end = Math.min(totalPages, start + maxPagesToShow - 1);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Pagination className="m-0 w-fit">
      <PaginationContent className="gap-3">
        <PaginationItem>
          <PaginationPrevious
            className="h-8 w-8 md:h-10 md:w-10 !p-0 flex items-center justify-center border hover:bg-blue hover:text-white duration-150 cursor-pointer"
            onClick={() => page > 1 && onPageChange(page - 1)}
          />
        </PaginationItem>

        {getPageNumbers().map((pg) => (
          <PaginationItem key={pg}>
            <PaginationLink
              onClick={() => onPageChange(pg)}
              className={`h-8 w-8 md:h-10 md:w-10 flex items-center justify-center border rounded-md cursor-pointer ${
                pg === page ? "bg-blue text-white" : ""
              }`}
            >
              {pg}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className="h-8 w-8 md:h-10 md:w-10 !p-0 flex items-center justify-center border hover:bg-blue hover:text-white duration-150 cursor-pointer"
            onClick={() => page < totalPages && onPageChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
