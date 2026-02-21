import { usePlantFilter } from "@/contexts/PlantFilterContext";
import { TextField } from "@mui/material";

export const PlantNameSearch = ({...props}) => {
    const { filters, setSearchQuery } = usePlantFilter();

    return (
        <TextField
            placeholder="contains..."
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ minWidth: "200" }}
            {...props}
        />
    );
};