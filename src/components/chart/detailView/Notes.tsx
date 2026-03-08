import { Stack, Typography } from "@mui/material";

export const Notes = ({ plant }) => {
    return (
        <Stack
            spacing={1}
            sx={{
                width: "100%",
                px: 2,
                py: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                backgroundColor: "#fafaf5",
            }}
        >
            <Typography
                variant="fieldLabel"
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