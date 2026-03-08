import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton, Link, Stack, Typography } from "@mui/material";
import { DetailViewHeader } from "./DetailViewHeader";
import { FramedIllustration } from "./FramedIllustration";
import { Notes } from './Notes';
import { PlantCharacteristics } from './PlantCharacteristics';
import { HostPlantInfo } from './HostPlantInfo';

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
                minWidth: 375,
            }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 2,
                        backgroundColor: "#fdfdf5",
                    },
                }
            }}
            {...props} >
            <DialogTitle sx={{
                pr: 6,
                textAlign: 'center',
                backgroundColor: '#f0ebe0',
            }}>
                <DetailViewHeader plant={plant} />
                <IconButton
                    onClick={props?.onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "center", sm: "flex-start" }}
                    spacing={4}
                >
                    <Stack alignItems="center" spacing={2}>
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

                    <Stack
                        spacing={2}
                        alignItems={{ xs: "center", sm: "flex-start" }}
                        sx={{ width: "100%" }}
                    >
                        <PlantCharacteristics plant={plant} />
                        <Notes plant={plant} />
                    </Stack>

                </Stack>
            </DialogContent>
        </Dialog>
    )
};