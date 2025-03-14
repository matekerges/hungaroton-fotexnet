import React from "react";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button } from "@mui/material";

import { usePaginationContext, useErrorContext } from "@/page/home/contexts";

const PaginationComponent: React.FC = () => {
    const { currentPage, totalPages, canNextPage, canPrevPage, setCurrentPage, nextPage, prevPage } =
        usePaginationContext();
    const { error } = useErrorContext();

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            pageNumbers.push(
                <Button key="start-page" onClick={() => setCurrentPage(1)}>
                    1
                </Button>
            );
            if (startPage >= 2) {
                pageNumbers.push(
                    <span
                        className="h-full mt-0.5 text-[#007799] w-[64px] flex items-center justify-center"
                        key="start-ellipsis"
                    >
                        ...
                    </span>
                );
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "contained" : "outlined"}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </Button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <span
                        className="h-full mt-0.5 text-[#007799] w-[64px] flex items-center justify-center"
                        key="end-ellipsis"
                    >
                        ...
                    </span>
                );
            }
            pageNumbers.push(
                <Button onClick={() => setCurrentPage(totalPages)} value={totalPages} key="totalPage">
                    {totalPages}
                </Button>
            );
        }

        return pageNumbers;
    };

    return (
        !error && totalPages > 1 && (
            <div className="flex gap-4 items-center justify-center mt-10">
                <Button
                    variant="text"
                    onClick={prevPage}
                    disabled={!canPrevPage}
                    className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50"
                >
                    <ArrowBack />
                </Button>
                <div className="flex gap-1">{renderPageNumbers()}</div>
                <Button
                    variant="text"
                    onClick={nextPage}
                    disabled={!canNextPage}
                    className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50"
                >
                    <ArrowForward />
                </Button>
            </div>
        )
    );
};

export default PaginationComponent;
