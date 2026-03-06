import { iconMap } from "@/theme/icons";
import type { SoilMoisture, SunLevel } from "@/types/plant";
import { Divider, Stack, Typography } from "@mui/material";

const IconLabel = ({ ...props }) =>
    <Typography
        variant="overline"
        fontSize={8}
        sx={{ color: "text.secondary" }}
        {...props}
    />

const Icon = ({ icon }) =>
    <img
        src={`${import.meta.env.BASE_URL}${icon.src}`}
        style={{ width: 30, height: 24, scale: icon.uiScale }}
    />

export const SunSoilRequirements = ({ plant }) => {
    const sunOrder: SunLevel[] = ["full", "part", "shade"];
    const soilOrder: SoilMoisture[] = ["wet", "med", "dry"];

    const sunIcons = sunOrder
        .filter(level => plant.sun.includes(level))
        .map(level => ({ ...iconMap.sun[level], level }));

    const soilIcons = soilOrder
        .filter(level => plant.soilMoisture.includes(level))
        .map(level => ({ ...iconMap.soil[level], level }));

    const IconGroup = ({ icons }) => (
        <Stack direction="row" spacing={2}>
            {icons.map(i => (
                <Stack key={i.level} alignItems="center">
                    <Icon icon={i} />
                    <IconLabel>{i.level}</IconLabel>
                </Stack>
            ))}
        </Stack>
    );

    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0, sm: 2 }}
            divider={<Divider orientation="vertical" flexItem />}
        >
            <IconGroup icons={sunIcons} />
            <IconGroup icons={soilIcons} />
        </Stack>
    );
}
