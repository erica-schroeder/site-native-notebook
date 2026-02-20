import { PlantChartMui } from "@/components/chart/PlantChartMui";
import { PlantSearch } from "@/components/PlantSearch";
import { ZoomControls } from "@/components/ZoomControls";
import { PlantFilterProvider, usePlantFilter } from "@/contexts/PlantFilterProvider";
import { ZoomProvider } from "@/contexts/ZoomProvider";
import { plantsWithAverages } from "@/data/plants";
import { Box, Stack, Typography } from "@mui/material";

const PlantChartPageContent = () => {
    const { areFiltersEmpty, filteredPlants } = usePlantFilter();

    return (
        <Stack sx={{ px: 4, mt: 2 }}>
            <ZoomProvider>
                <Stack alignItems="center">
                    <PlantSearch allPlants={plantsWithAverages} />
                </Stack>
                {filteredPlants.length === 0
                    ?
                    <Typography sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
                        No plants match your filters. Try adjusting bloom color, height, sun, or soil requirements.
                    </Typography>
                    : areFiltersEmpty()
                        ?
                        <Typography sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
                            Use the filters above to see plants!
                        </Typography>
                        :

                        <Box sx={{ ml: 4 }}>
                            <PlantChartMui />
                        </Box>
                }


                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: 16,
                        transform: "translateY(-50%)",
                        gap: 1,
                        zIndex: 10,
                        padding: 1,              // space inside the box
                        borderRadius: 2,         // rounded corners
                        backgroundColor: "rgba(255,255,255,0.9)",  // semi-transparent white
                        boxShadow: 1,            // subtle shadow for depth
                        border: "1px solid rgba(0,0,0,0.1)",       // subtle border
                        backdropFilter: "blur(4px)",               // slightly blur content behind
                    }}
                >
                    <ZoomControls />
                </Box>
            </ZoomProvider>
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