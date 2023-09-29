"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  pageNumber: number;
  iSNext: boolean;
  path: string;
};

function Pagination({ pageNumber, iSNext, path }: Props) {
  const route = useRouter();
  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;
    if (type === "prev") {
      nextPageNumber = Math.max(1, nextPageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = nextPageNumber + 1;
    }
    if (nextPageNumber > 1) {
      route.push(`${path}?page=${nextPageNumber}`);
    } else {
      route.push(`${path}`);
    }
  };
  if (!iSNext && pageNumber === 1) return null;
  return (
    <div className="mt-10 flex justify-center gap-5 items-center w-full">
      <Button
        className="!text-small-regular text-light-2"
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
      >
        Previous
      </Button>
      <p className="text-small-semibold text-light-1">{pageNumber}</p>
      <Button
        className="!text-small-regular text-light-2"
        onClick={() => handleNavigation("next")}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
