import { Box, Stack, Typography } from "@mui/material"
import YardIcon from '@mui/icons-material/Yard';

export const FramedIllustration = ({ plant }) => {
    return (
        <Box
            sx={{
                height: { xs: 220, md: 320 },
                width: { xs: "100%", md: 320 },
                minWidth: 175,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #a1887f",
                borderRadius: 2,
                pt: 1,
                px: 1,
                /*
                            pt: 1,
                            px: 1,
                            height: { xs: 200, md: 300 },
                            border: "4px solid #6d4c41",
                            borderRadius: 2,
                            boxShadow: "inset 0 0 0 2px #a1887f",
                            display: "inline-flex",
                            alignItems: "flex-end",
                            */
            }}
        >
            {plant?.illustration?.svg
                ?
                <img
                    src={`${import.meta.env.BASE_URL}illustrations/${plant?.illustration?.svg}`}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                :
                <Stack justifyContent="center" alignItems="center">
                    <YardIcon />
                    <Typography>No illustration yet!</Typography>
                </Stack>
            }
        </Box>
    );
};