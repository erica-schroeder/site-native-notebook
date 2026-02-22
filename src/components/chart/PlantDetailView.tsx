import { Box, Button, Dialog, DialogActions, DialogContent, Link, Stack, Typography } from "@mui/material";

export const PlantDetailView = ({ plant, open, ...props }) => {
    const googleSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
        plant?.scientificName
    )}&safe=active`;

    if(!plant) {
        return;
    }

    return (
        <Dialog
            open={open}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 10,
                        border: "1px solid #aaa",
                        backgroundColor: "#fdfdf5",
                        px: 2,
                    },
                }
            }}
            {...props} >
            <DialogContent>
                <Stack direction="row" spacing={4}>
                    <Box
                        sx={{
                            pt: 1,
                            px: 1,
                            //width: 300,
                            height: 300,
                            border: "4px solid #6d4c41",
                            borderRadius: 10,
                            boxShadow: "inset 0 0 0 2px #a1887f",
                        }}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}${plant?.illustration?.svg}`}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                    </Box>

                    <Stack alignItems="center" spacing={1}>
                        <Stack alignItems="center">
                        <Typography variant="h6">{plant?.commonName}</Typography>
                        <Typography variant="body1" fontStyle="italic">{plant?.scientificName}</Typography>
                    </Stack>
                    <Link
                        href={googleSearchUrl}
                        target="_blank"
                            rel="noopener noreferrer"
                        >
                            Search for images
                        </Link>
                </Stack>

                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props?.onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
};