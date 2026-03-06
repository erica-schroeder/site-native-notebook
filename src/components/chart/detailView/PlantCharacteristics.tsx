import { Stack, Typography } from "@mui/material";
import { SunSoilRequirements } from "./SunSoilRequirements";

const Label = ({...props}) =>
    <Typography
        variant="overline"
        fontSize={12}
        sx={{ color: "text.secondary" }}
        {...props}
    />

const formatFt = (ft: number) => {
    if (ft < 1) return `${Math.round(ft * 12)}"`;
    return `${ft}'`;
};

export const PlantCharacteristics = ({ plant }) => {
    return (

        <Stack spacing={0}>
            {[
                { label: "Conditions", value: <SunSoilRequirements plant={plant} /> },
                { label: "Height", value: `${formatFt(plant.heightFt.min)} - ${formatFt(plant.heightFt.max)}` },
                { label: "Spread", value: `${formatFt(plant.widthFt.min)} - ${formatFt(plant.widthFt.max)}` },
            ].map(({ label, value }) => (
                <Stack key={label} direction="row" spacing={2} alignItems="center">
                    <Label sx={{ width: 100, flexShrink: 0 }}>
                        {label}
                    </Label>
                    {typeof value === 'string' ? <Typography variant="body2">{value}</Typography> : value}
                </Stack>
            ))}
        </Stack>
    );
}