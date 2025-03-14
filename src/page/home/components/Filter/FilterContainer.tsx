import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FilterComponent from "./FilterComponent";
import { SelectChangeEvent } from "@mui/material";

import { useFilterContext } from "@/page/home/contexts/FilterContext";

const STORAGE_KEY = "HUNGAROTON_FILTERS";

const FilterContainer = () => {
    const [letter, setLetter] = useState("");
    const [type, setType] = useState("");

    const { setFilters } = useFilterContext();
    const { filters } = useFilterContext();

    const searchParams = useSearchParams();
    const isInitialMount = useRef(true);
    const router = useRouter();

    const searchInputRef = useRef<HTMLInputElement>(null);

    const updateFiltersAndUrl = useCallback(
        (newFilters: typeof filters) => {
            setFilters(newFilters);

            const params = new URLSearchParams();
            if (newFilters.search) params.set("search", newFilters.search);
            if (newFilters.letter) params.set("letter", newFilters.letter);
            if (newFilters.type) params.set("type", newFilters.type);
            if (!newFilters.include_image) params.set("include_image", "false");

            const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
            router.replace(newUrl);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newFilters));
        },
        [router, setFilters]
    );

    useEffect(() => {
        if (isInitialMount.current) {
            const defaultFilters = {
                search: "",
                letter: "",
                type: "",
                include_image: true
            };

            const urlFilters = {
                search: searchParams.get("search") || "",
                letter: searchParams.get("letter") || "",
                type: searchParams.get("type") || "",
                include_image: searchParams.get("include_image") !== "false"
            };

            const savedFilters = localStorage.getItem(STORAGE_KEY);
            const parsedSavedFilters = savedFilters ? {
                ...JSON.parse(savedFilters),
                include_image: JSON.parse(savedFilters).include_image ?? true
            } : null;

            const hasUrlParams = Object.values(urlFilters).some(val => val) ||
                searchParams.has("include_image");

            const finalFilters = hasUrlParams ? urlFilters :
                parsedSavedFilters || defaultFilters;

            setFilters(finalFilters);
            setLetter(finalFilters.letter);
            setType(finalFilters.type);
            if (searchInputRef.current) {
                searchInputRef.current.value = finalFilters.search;
            }

            isInitialMount.current = false;
        }
    }, [searchParams, setFilters]);

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        const newType = event.target.value;
        setType(newType);
    };

    const handleTextSearchClear = () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
        }
    };

    const handleDeleteFilters = () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
        }
        setType("");
        setLetter("");
        const defaultFilters = {
            search: "",
            letter: "",
            type: "",
            include_image: true,
        };
        updateFiltersAndUrl(defaultFilters);
        localStorage.removeItem(STORAGE_KEY);
    };

    const handleLetterChange = (newLetter: string) => {
        setLetter(newLetter);
        updateFiltersAndUrl({
            ...filters,
            letter: newLetter,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const newFilters = {
            ...filters,
            search: searchInputRef.current?.value ?? "",
            letter,
            type,
        };
        updateFiltersAndUrl(newFilters);
    };

    return (
        <FilterComponent
            filters={filters}
            letter={letter}
            onDeleteFilters={handleDeleteFilters}
            onSearch={handleSearch}
            onTextSearchClear={handleTextSearchClear}
            onTypeChange={handleTypeChange}
            searchInputRef={searchInputRef}
            setLetter={handleLetterChange}
            setType={setType}
            type={type}
            updateFilter={(key, value) => updateFiltersAndUrl({ ...filters, [key]: value })}
        />
    );
};

export default FilterContainer;
