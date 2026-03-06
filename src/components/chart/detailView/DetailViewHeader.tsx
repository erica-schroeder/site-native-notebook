import { Stack, Typography } from "@mui/material";

export const DetailViewHeader = ({ plant }) => {
    return (
        <Stack>
            <Stack direction="row" alignItems="end" spacing={1}>
                <Typography fontWeight="bold">
                    {plant?.commonName}
                </Typography>

                <Typography>•</Typography>

                <Typography
                    fontStyle="italic"
                    color="text.secondary"
                >
                    {plant?.scientificName}
                </Typography>
            </Stack>

            {plant.otherNames?.length > 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ pl: 0 }}>
                    Also called: {plant.otherNames.join(", ")}
                </Typography>
            )}
        </Stack>
    );
};