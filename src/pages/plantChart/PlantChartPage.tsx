import { PlantChartMui } from "@/components/chart/PlantChartMui";
import { PlantSearch } from "@/components/plantSearch/PlantSearch";
import { ZoomControls } from "@/components/ZoomControls";
import { PlantFilterProvider, usePlantFilter } from "@/contexts/PlantFilterContext";
import { ZoomProvider } from "@/contexts/ZoomContext";
import { plantsWithAverages } from "@/data/plants";
import { Alert, Box, Divider, Pagination, Slide, Snackbar, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const PAGE_SIZE = 20;

const PlantChartPageContent = () => {
    const [ showHint, setShowHint ] = useState(false);
    const [ showSizeWarning, setShowSizeWarning ] = useState(false);
    const { areFiltersEmpty, filteredPlants } = usePlantFilter();

    const [ page, setPage ] = useState(1);
    const pageCount = Math.ceil((filteredPlants?.length ?? 0) / PAGE_SIZE);
    const start = (page - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, filteredPlants?.length);
    const paginatedPlants = filteredPlants?.slice(start, end);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setPage(1);
    }, [filteredPlants]);

    useEffect(() => {
        if(isMobile) setShowSizeWarning(true);
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
                    /*
                    areFiltersEmpty()
                        ?
                        <Typography sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
                            Use the filters above to see plants!
                        </Typography>
                        :
                        */
                    <Box
                    >
                        <Box display="flex" justifyContent="center" sx={{ pt: 4 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                                Showing {start + 1}–{end} of {filteredPlants.length} plants
                            </Typography>
                        </Box>

                        {pageCount > 1 && (
                            <Box display="flex" justifyContent="center">
                                <Pagination
                                    count={pageCount}
                                    page={page}
                                    onChange={(_, value) => setPage(value)}
                                    color="primary"
                                    size="small"
                                />
                            </Box>
                        )}

                        <PlantChartMui plants={paginatedPlants} />
                        {pageCount > 1 && (
                            <Box display="flex" justifyContent="center" sx={{ pt: 2, pb: 2 }}>
                                <Pagination
                                    count={pageCount}
                                    page={page}
                                    onChange={(_, value) => setPage(value)}
                                    color="primary"
                                    size="small"
                                />
                            </Box>
                        )}
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
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={showSizeWarning}
                slots={{ transition: Slide }}
                onClose={() => setShowSizeWarning(false)}
            >
                <Alert
                    icon={false}
                    onClose={() => setShowSizeWarning(false)}
                    severity="warning"
                    variant="filled"
                    sx={{
                        backgroundColor: "#fecd01",
                        color: "black",
                    }}
                >
                    For the best experience, try Native Notebook on a larger screen!
                </Alert>
            </Snackbar>

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
                    variant="filled"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    }}
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