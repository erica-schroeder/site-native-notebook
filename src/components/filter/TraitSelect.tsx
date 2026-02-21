import { usePlantFilter } from "@/contexts/PlantFilterContext";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";

export const TraitSelect = ({ ...props }) => {
  const { filters, setTraits } = usePlantFilter();

    return (
        <ToggleButtonGroup
            value={filters.traits}
            onChange={(_, value) => setTraits(value)}
            {...props}
        >
            <Tooltip title="Keystone species" arrow>
                <ToggleButton value="keystone">
                    <img src="icons/keystone-icon.svg" width={30} height={20} style={{ transform: "scale(1.1)", display: "block" }} />
                </ToggleButton>
            </Tooltip>

        </ToggleButtonGroup>
    );
};