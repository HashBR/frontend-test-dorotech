import { useEffect, useState } from "react";
import { PaginateInfo } from "../../models/paginateInfo";
import paginate from "../../utils/paginate";
import "./pagination.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

//make interface for pagination
interface PaginationProps {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const [pageInfo, setPageInfo] = useState<PaginateInfo>();
  useEffect(() => {
    setPageInfo(paginate(itemsCount, currentPage, pageSize));
  }, []);

  useEffect(() => {
    setPageInfo(paginate(itemsCount, currentPage, pageSize));
  }, [currentPage]);

  return (
    <div className="flex items-center">
      <button
        type="button"
        className="flex items-center justify-center rounded-full bg-yellow-50 w-10 h-10 mx-1 p-3"
        onClick={() => {
          if (onPageChange) {
            onPageChange(1);
          }
        }}
      >
        <FontAwesomeIcon icon={faAnglesLeft} size="lg" />
      </button>
      {pageInfo?.pages.map((page: number) => (
        <button
          key={page}
          type="button"
          className={`page-item flex items-center justify-center bg-yellow-50 w-10 h-10 p-3 ${
            page === currentPage ? "active-item" : ""
          }`}
          onClick={() => {
            if (onPageChange) {
              onPageChange(page);
            }
          }}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="flex items-center justify-center rounded-full bg-yellow-50 w-10 h-10 mx-1 my-5 p-3"
        onClick={() => {
          if (onPageChange) {
            onPageChange(pageInfo!.totalPages);
          }
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} size="lg" />
      </button>
    </div>
  );
};

export default Pagination;
