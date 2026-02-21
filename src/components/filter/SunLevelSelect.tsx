import { usePlantFilter } from "@/contexts/PlantFilterContext";
import { iconMap } from "@/theme/icons";
import { ToggleButtonFilter } from "./ToggleButtonFilter";

const options = [{
    value: "full",
    tooltip: "Full sun",
    icon: iconMap.sun.full,
}, {
    value: "part",
    tooltip: "Part sun",
    icon: iconMap.sun.part,
}, {
    value: "shade",
    tooltip: "Shade",
    icon: iconMap.sun.shade,
}];

export const SunLevelSelect = ({ ...props }) => {
    const { filters, setSunLevels } = usePlantFilter();

    return (
        <ToggleButtonFilter
            options={options}

            value={filters.sunLevels}
            onChange={(_, value) => setSunLevels(value)}
            {...props}
        />
    );
};