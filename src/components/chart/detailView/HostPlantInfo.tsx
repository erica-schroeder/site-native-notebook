import { lepidoptera } from "@/data/lepidoptera";
import { Stack, Typography } from "@mui/material";

export const HostPlantInfo = ({ plant }) => {
    return (
        <Stack spacing={0.5}>
            {plant.hostCaterpillars.map(id => {
                const caterpillar = lepidoptera.find(l => l.id === id);
                return (
                    <Stack key={id} direction="row" spacing={2} alignItems="center">
                        <img src={`${import.meta.env.BASE_URL}${caterpillar.icon}`} style={{ height: 30, scale: 1.5 }} />
                        <Typography variant="fieldLabel" fontSize={10}>{caterpillar.commonName}</Typography>
                    </Stack>
                )
            })}
        </Stack>
    );
};