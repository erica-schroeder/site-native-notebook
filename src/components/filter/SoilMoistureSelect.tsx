import { usePlantFilter } from "@/contexts/PlantFilterContext";
import { iconMap } from "@/theme/icons";
import { ToggleButtonFilter } from "./ToggleButtonFilter";

const options = [{
    value: "wet",
    tooltip: "Wet soil",
    icon: iconMap.soil.wet,
}, {
    value: "med",
    tooltip: "Medium soil",
    icon: iconMap.soil.med,
}, {
    value: "dry",
    tooltip: "Dry soil",
    icon: iconMap.soil.dry,
}];

export const SoilMoistureSelect = ({ ...props }) => {
    const { filters, setSoilMoistures } = usePlantFilter();

    return (
        <ToggleButtonFilter
            options={options}
            value={filters.soilMoistures}
            onChange={(_, value) => setSoilMoistures(value)}
            {...props}
        />
    );
};