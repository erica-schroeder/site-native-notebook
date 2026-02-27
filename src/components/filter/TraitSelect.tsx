import { usePlantFilter } from "@/contexts/PlantFilterContext";
import { iconMap } from "@/theme/icons";
import { FormControl, Stack } from "@mui/material";
import { useState } from "react";
import { FilterLabel } from "./FilterLabel";
import { ToggleButtonFilter } from "./ToggleButtonFilter";
import { TraitsDialog } from "./TraitsDialog";

type TraitFilterProps = {
    size?: "xs" | "md" | "lg";
}

const options = [{
    value: "keystone",
    tooltip: "Keystone species",
    icon: iconMap.traits.keystone,
}];

export const TraitSelect = ({ size }: TraitFilterProps) => {
    const { filters, setTraits } = usePlantFilter();
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <FormControl>
                <Stack direction="row" spacing={.5} alignItems="center">
                    <FilterLabel
                        size={size}
                        showInfoIcon={true}
                        onInfoIconClicked={() => setDialogOpen(true)}
                    >
                        Traits
                    </FilterLabel>
                </Stack>
                <ToggleButtonFilter
                    value={filters.traits}
                    onChange={(_, value) => setTraits(value)}
                    options={options}
                    size={size}
                />
            </FormControl>
            <TraitsDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </>
    );
};