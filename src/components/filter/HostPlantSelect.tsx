import { lepidoptera } from "@/data/lepidoptera"
import {
    Autocomplete,
    Box,
    Chip,
    createFilterOptions,
    FormControl,
    ListItemText,
    Stack,
    TextField
} from "@mui/material"
import { FilterLabel } from "./FilterLabel"
import { usePlantFilter } from "@/contexts/PlantFilterContext";
import type { Lepidoptera } from "@/types/lepidoptera";


export const HostPlantSelect = ({ size, fontSize }) => {
    const { filters, setCaterpillars } = usePlantFilter();

    const valueObjects = lepidoptera.filter((l) => filters.caterpillars.includes(l.id));

    const filterOptions = createFilterOptions<Lepidoptera>({
        stringify: (option) =>
            `${option.commonName} ${option.scientificName}`.toLowerCase()
    });

    return (
        <FormControl>
            <FilterLabel size={size}>
                Caterpillar Host
            </FilterLabel>
            <Autocomplete
                multiple
                options={lepidoptera}
                value={valueObjects}
                onChange={(_, newValue) => {
                    const ids = newValue.map((option) => option.id);
                    setCaterpillars(ids);
                }}
                getOptionLabel={(option) => option.commonName}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                filterOptions={filterOptions}
                sx={{
                    minWidth: 300,
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Select lepidoptera species"
                        size="small"
                        sx={{
                            "& .MuiInputBase-input::placeholder": {
                                fontSize: fontSize
                            },
                        }}
                    />
                )}
                renderOption={(props, option) => (
                    <Stack
                        direction="row"
                        spacing={2}
                        component="li"
                        {...props}
                    >
                        <Box
                            component="img"
                            src={option.icon}
                            alt={option.commonName}
                            sx={{
                                width: 80,
                                height: 80,
                            }}
                        />
                        <ListItemText
                            primary={option.commonName}
                            secondary={option.scientificName}
                        />
                    </Stack>
                )}

                renderValue={(selected, getItemProps) => (
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {selected.map((option, index) => (
                            <Chip
                                {...getItemProps(index)}
                                variant="outlined"
                                key={option.id}
                                icon={
                                    <Box
                                        component="img"
                                        src={option.icon}
                                        alt=""
                                        sx={{ width: 40, height: 40 }}
                                    />
                                }
                                label={option.commonName}
                                sx={{
                                    fontSize: fontSize
                                }}
                            />
                        ))}
                    </Box>
                )}
            />
        </FormControl>
    )
}