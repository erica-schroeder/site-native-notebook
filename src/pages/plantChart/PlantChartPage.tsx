import { PlantChartMui } from "@/components/chart/PlantChartMui";
import { PlantSearch } from "@/components/plantSearch/PlantSearch";
import { ZoomControls } from "@/components/ZoomControls";
import { PlantFilterProvider, usePlantFilter } from "@/contexts/PlantFilterContext";
import { ZoomProvider } from "@/contexts/ZoomContext";
import { plantsWithAverages } from "@/data/plants";
import { Alert, Box, Divider, Slide, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const PlantChartPageContent = () => {
    const [ showHint, setShowHint ] = useState(false);
    const { areFiltersEmpty, filteredPlants } = usePlantFilter();

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Stack sx={{ px: 4, mt: 2 }}>

            <Stack direction="row" alignItems="center" justifyContent="center">
                <Typography variant="h5" component="h1">
                    Find Michigan Native Plants
                </Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <ZoomProvider>
                <Stack alignItems="center">
                    <PlantSearch allPlants={plantsWithAverages} />
                </Stack>
                {filteredPlants.length === 0
                    ?
                    <Typography sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
                        No plants match your filters. Try adjusting bloom color, height, sun, or soil requirements.
                    </Typography>
                    :
                    areFiltersEmpty()
                        ?
                        <Typography sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
                            Use the filters above to see plants!
                        </Typography>
                        :
                        <Box
                            sx={{
                                ml: { xs: 0, md: 4 }, // remove left margin on small screens
                                //minWidth: { xs: 900, md: "100%" },
                            }}
                        >
                            <PlantChartMui />
                        </Box>
                }


{/*
                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: 16,
                        transform: "translateY(-50%)",
                        gap: 1,
                        zIndex: 10,
                        padding: 1,
                        borderRadius: 2,
                        backgroundColor: "rgba(255,255,255,0.9)",
                        boxShadow: 1,
                        border: "1px solid rgba(0,0,0,0.1)",
                        backdropFilter: "blur(4px)",
                        display: { xs: "none", md: "block" },
                    }}
                >
                    <ZoomControls />
                </Box>
                */}
            </ZoomProvider>

            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={showHint}
                slots={{ transition: Slide }}
                autoHideDuration={4000}
                onClose={() => setShowHint(false)}
            >
                <Alert
                    icon={false}
                    onClose={() => setShowHint(false)}
                    severity="success"
                    variant="filled"
                >
                    Click any plant to view details!
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export const PlantChartPage = () => {
    return (
        <PlantFilterProvider>
            <PlantChartPageContent />
        </PlantFilterProvider>
    );
};