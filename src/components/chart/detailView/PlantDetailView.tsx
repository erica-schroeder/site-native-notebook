import { Button, Dialog, DialogActions, DialogContent, Link, Stack, Typography } from "@mui/material";
import { DetailViewHeader } from "./DetailViewHeader";
import { FramedIllustration } from "./FramedIllustration";

export const PlantDetailView = ({ plant, open, ...props }) => {
    const googleSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
        plant?.scientificName
    )}&safe=active`;

    if (!plant) {
        return;
    }

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="md"
            sx={{
                minWidth: 600
            }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 2,
                        border: "1px solid #aaa",
                        backgroundColor: "#fdfdf5",
                        px: 2,
                    },
                }
            }}
            {...props} >
            <DialogContent>
                <Stack direction="row" spacing={4}>
                    <Stack alignItems="center">
                        <FramedIllustration plant={plant} />
                        <Typography variant="caption">
                            <Link
                                href={googleSearchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Search for images
                            </Link>
                        </Typography>
                    </Stack>

                    <Stack spacing={1} sx={{ flex: 1 }}>
                        <DetailViewHeader plant={plant} />
                        <Stack
                            sx={{
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
                                <Typography
                                    variant="caption"
                                >
                                    {plant.notes}
                                </Typography>
                                :
                                <Typography
                                    variant="caption"
                                    fontStyle="italic"
                                >
                                    None yet!
                                </Typography>
                            }
                        </Stack>
                    </Stack>

                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props?.onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
};