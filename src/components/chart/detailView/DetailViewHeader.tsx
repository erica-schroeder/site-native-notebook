import { Divider, Stack, Typography } from "@mui/material";

export const DetailViewHeader = ({ plant }) => {
    return (
        <Stack alignItems="center">
            <Stack
                direction={{xs: "column", sm: "row" }}
                alignItems={{ xs: "center", sm: "end" }}
                spacing={{ xs: 0, sm: 1 }}
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Typography fontWeight="bold">
                    {plant?.commonName}
                </Typography>

                <Typography
                    fontStyle="italic"
                    color="text.secondary"
                    sx={{
                        fontSize: { xs: 14, sm: 16 }
                    }}
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