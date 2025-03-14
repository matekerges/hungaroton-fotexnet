import React, { createContext, useState, useContext, ReactNode } from "react";

import { FilterState } from "@/page/home/types";

interface FilterContextType {
    clearFilters: () => void;
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    updateFilter: (key: keyof FilterState, value: string | boolean | undefined) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
    children: ReactNode;
    initialFilters?: FilterState;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({
    children,
    initialFilters = {
        search: "",
        letter: "",
        type: "",
        include_image: true,
    },
}) => {
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    const clearFilters = () => {
        setFilters({
            search: "",
            letter: "",
            type: "",
            include_image: true,
        });
    };

    const updateFilter = (key: keyof FilterState, value: string | boolean | undefined) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const value = {
        filters,
        setFilters,
        clearFilters,
        updateFilter,
    };

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilterContext must be used within a FilterProvider");
    }
    return context;
};
