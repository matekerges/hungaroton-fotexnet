import React, { createContext, useState, useContext, ReactNode } from "react";

interface PaginationContextType {
    canNextPage: boolean;
    canPrevPage: boolean;
    currentPage: number;
    nextPage: () => void;
    perPage: number;
    prevPage: () => void;
    setCurrentPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    setTotalItems: (total: number) => void;
    setTotalPages: (total: number) => void;
    totalItems: number;
    totalPages: number;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

interface PaginationProviderProps {
    children: ReactNode;
    initialPage?: number;
    initialPerPage?: number;
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({
    children,
    initialPage = 1,
    initialPerPage = 50,
}) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [perPage, setPerPage] = useState(initialPerPage);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const canNextPage = currentPage < totalPages;
    const canPrevPage = currentPage > 1;

    const value = {
        canNextPage,
        canPrevPage,
        currentPage,
        nextPage,
        perPage,
        prevPage,
        setCurrentPage,
        setPerPage,
        setTotalItems,
        setTotalPages,
        totalItems,
        totalPages,
    };

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
};

export const usePaginationContext = (): PaginationContextType => {
    const context = useContext(PaginationContext);
    if (context === undefined) {
        throw new Error("usePaginationContext must be used within a PaginationProvider");
    }
    return context;
};
