import { PlantChartMui } from "@/components/PlantChartMui";
import { PlantSearch } from "@/components/PlantSearch";
import { ChartFilterProvider } from "@/contexts/ChartFilterProvider";
import { plantsWithAverages } from "@/data/plants";
import { Stack } from "@mui/material";

export const PlantChartPage = () => {

    return (
        <Stack sx={{ px: 4 }}>
            <ChartFilterProvider>
                <PlantSearch allPlants={plantsWithAverages} />
                <PlantChartMui />
            </ChartFilterProvider>
        </Stack>
    );
};