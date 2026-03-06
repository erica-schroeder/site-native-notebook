import { Stack, Typography } from "@mui/material";

export const Notes = ({ plant }) => {
    return (
        <Stack
            sx={{
                width: "100%",
                mt: 2,
                px: 2,
                pb: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                backgroundColor: "#fafaf5",
            }}
        >
            <Typography
                variant="overline"
                sx={{ color: "text.secondary" }}
            >
                Erica's Notes
            </Typography>

            {plant.notes
                ?
                <Typography variant="caption" >
                    {plant.notes}
                </Typography>
                :
                <Typography variant="caption" fontStyle="italic" >
                    None yet!
                </Typography>
            }
        </Stack>

    );
}