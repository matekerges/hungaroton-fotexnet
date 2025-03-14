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
                <Button key="start-page" onClick={() => setCurrentPage(1)} className="!hidden md:!block">
                    1
                </Button>
            );
            if (startPage >= 3) {
                pageNumbers.push(
                    <span
                        className="h-full mt-0.5 text-[#007799] w-8 pr-5 items-center justify-center hidden md:flex"
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
                    className={currentPage !== i ? "!hidden md:!block" : ""}
                >
                    {i}
                </Button>
            );
        }
        pageNumbers.push(
            <span key="mobile-total-page-number" className="flex items-center md:hidden">
                <span className="pl-4 pt-1 text-[#007799]">/</span>
                <Button variant="text" onClick={() => setCurrentPage(totalPages)} className="md:!hidden">
                    {totalPages}
                </Button>
            </span>
        );

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <span
                        className="h-full mt-0.5 text-[#007799] w-8 pl-5 items-center justify-center hidden md:flex"
                        key="end-ellipsis"
                    >
                        ...
                    </span>
                );
            }
            pageNumbers.push(
                <Button onClick={() => setCurrentPage(totalPages)} value={totalPages} key="totalPage" className="!hidden md:!block">
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
