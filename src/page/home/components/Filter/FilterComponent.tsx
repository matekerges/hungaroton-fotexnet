import React from "react";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    TextField,
    Tooltip,
    ToggleButton,
    ToggleButtonGroup,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { FilterState } from "@/page/home/types";

const letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
];

interface FilterComponentProps {
    filters: FilterState;
    letter: string;
    onDeleteFilters: () => void;
    onSearch: (e: React.FormEvent) => void;
    onTextSearchClear: () => void;
    onTypeChange: (event: SelectChangeEvent<string>) => void;
    searchInputRef: React.RefObject<HTMLInputElement | null>;
    setLetter: (letter: string) => void;
    type: string;
    updateFilter: (key: keyof FilterState, value: string | boolean | undefined) => void;
}

const FilterComponent = ({
    filters,
    letter,
    onDeleteFilters,
    onSearch,
    onTextSearchClear,
    onTypeChange,
    searchInputRef,
    setLetter,
    type,
    updateFilter,
}: FilterComponentProps) => {


    return (
        <div className="md:pt-10">
            <form onSubmit={onSearch} className="flex justify-center flex-wrap gap-4 md:gap-2 w-full">
                <TextField
                    placeholder="Search"
                    inputRef={searchInputRef}
                    className="w-full md:w-auto [&>div]:!pr-1"
                    variant="outlined"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton className="group" onClick={onTextSearchClear}>
                                        <Close className="text-gray-300 group-hover:text-gray-400" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <FormControl className="w-full md:w-[200px]">
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        value={type || "all"}
                        label="Type"
                        onChange={onTypeChange}
                    >
                        <MenuItem value="all">All types</MenuItem>
                        <MenuItem value="is_composer">Composer</MenuItem>
                        <MenuItem value="is_performer">Performer</MenuItem>
                        <MenuItem value="is_primary">Primary</MenuItem>
                    </Select>
                </FormControl>
                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Switch
                            checked={filters.include_image}
                            onChange={(e) => updateFilter("include_image", e.target.checked)}
                        />
                        <span>Album cover</span>
                    </label>
                </div>
                <div className="flex gap-2">
                    <Tooltip title="Delete filters" placement="top" arrow enterDelay={700}>
                        <Button
                            type="button"
                            onClick={onDeleteFilters}
                            disabled={!filters.search && !filters.type && !filters.letter}
                        >
                            <Delete />
                        </Button>
                    </Tooltip>
                    <Button type="submit" color="primary" variant="contained">
                        Search
                    </Button>
                </div>
            </form>
            <div className="overflow-x-auto xl:w-fit xl:mx-auto">
                <ToggleButtonGroup
                    onChange={(e, value) => {
                        setLetter(value || "");
                    }}
                    value={letter}
                    exclusive
                    aria-label="letter selector"
                    className="mt-5"
                >
                    {letters.map((l, index) => (
                        <ToggleButton
                            onClick={() => {
                                setLetter(letter === l ? "" : l);
                            }}
                            value={l}
                            aria-label={l}
                            key={index}
                        >
                            {l}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>
        </div>
    );
};

export default FilterComponent;
