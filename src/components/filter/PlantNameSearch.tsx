import { usePlantFilter } from "@/contexts/PlantFilterContext";
import { Box, FormControl, TextField } from "@mui/material";
import { FilterLabel } from "./FilterLabel";

export const PlantNameSearch = ({size, ...props}) => {
    const { filters, setSearchQuery } = usePlantFilter();

    return (
        <FormControl sx={{ flex: 1 }}>
            <FilterLabel size={size}>
                Common or Scientific Name
            </FilterLabel>
            <TextField
                placeholder="contains..."
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                //sx={{ minWidth: "200" }}
                {...props}
            />
        </FormControl>
    );
};