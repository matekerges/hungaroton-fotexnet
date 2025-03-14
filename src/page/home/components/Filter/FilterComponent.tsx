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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
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
    onTypeChange: (event: SelectChangeEvent<string>) => void;
    onTypeSelectChange: (
        event: React.MouseEvent<HTMLLIElement>,
        currentType: string,
        newType: string,
        onTypeChange: (event: SelectChangeEvent<string>) => void
    ) => void;
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
    onTypeChange,
    onTypeSelectChange,
    searchInputRef,
    setLetter,
    type,
    updateFilter,
}: FilterComponentProps) => {

    return (
        <div className="md:pt-10">
            <form onSubmit={onSearch} className="flex justify-center flex-wrap gap-4 md:gap-2 w-full">
                <TextField
                    placeholder="Keresés"
                    inputRef={searchInputRef}
                    className="w-full md:w-auto"
                    variant="outlined"
                />
                <FormControl className="w-full md:w-[200px]">
                    <InputLabel id="type-select-label">Típus</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        value={type}
                        label="Típus"
                        onChange={onTypeChange}
                    >
                        <MenuItem
                            value="is_composer"
                            onClick={(e) => onTypeSelectChange(e, type, "is_composer", onTypeChange)}
                        >
                            Composer
                        </MenuItem>
                        <MenuItem
                            value="is_performer"
                            onClick={(e) => onTypeSelectChange(e, type, "is_performer", onTypeChange)}
                        >
                            Performer
                        </MenuItem>
                        <MenuItem
                            value="is_primary"
                            onClick={(e) => onTypeSelectChange(e, type, "is_primary", onTypeChange)}
                        >
                            Primary
                        </MenuItem>
                    </Select>
                </FormControl>
                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Switch
                            checked={filters.include_image}
                            onChange={(e) => updateFilter("include_image", e.target.checked)}
                        />
                        <span>Album borító</span>
                    </label>
                </div>
                <div className="flex gap-2">
                    <Tooltip title="A beállított szűrők törlése" placement="top" arrow enterDelay={700}>
                        <Button
                            type="button"
                            onClick={onDeleteFilters}
                            disabled={!filters.search && !filters.type && !filters.letter}
                        >
                            <Delete />
                        </Button>
                    </Tooltip>
                    <Button type="submit" color="primary" variant="contained">
                        Keresés
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
