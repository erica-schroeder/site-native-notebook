import { plantsWithAverages } from '@/data/plants';
import { useContainerWidth } from '@/hooks/useContainerWidth';
import type { Plant } from '@/types/plant';
import { Stack } from '@mui/material';
import {
    ChartContainer,
    ChartsGrid,
    ChartsXAxis,
    ChartsYAxis,
} from '@mui/x-charts';
import { sortBy } from 'lodash-es';
import { PlantRenderer } from './PlantRenderer';

const MARGIN = { left: 0, right: 70, top: 20, bottom: 150 };

const TARGET_PX_PER_FOOT = 100;
const SPACING_FT = .5;

function splitPlantsIntoRows(plants: Plant[], maxFeetPerRow: number) {
    const rows: Plant[][] = [];
    let currentRow: Plant[] = [];
    let currentFeet = 0;

    const sortedPlants = sortBy(plants, 'avgHeight').reverse();

    for (const plant of sortedPlants) {
        const plantWidth = plant.avgWidth ?? 1 + SPACING_FT;

        if (currentFeet + plantWidth > maxFeetPerRow && currentRow.length > 0) {
            rows.push(currentRow);
            currentRow = [];
            currentFeet = 0;
        }

        currentRow.push(plant);
        currentFeet += plantWidth;
    }

    if (currentRow.length > 0) rows.push(currentRow);
    return rows;
}

export const PlantChartMui = () => {
    const { ref: containerRef, width: containerWidth } = useContainerWidth<HTMLDivElement>();
    const usableWidth = containerWidth - MARGIN.left - MARGIN.right;
    const maxFeetPerRow = Math.max(3, Math.floor(usableWidth / TARGET_PX_PER_FOOT));

    const plantRows = splitPlantsIntoRows(plantsWithAverages, maxFeetPerRow);

    const widestRowFeet = Math.max(
        ...plantRows.map(row =>
            row.reduce((sum, p) => sum + (p.avgWidth ?? 1), 0)
            + SPACING_FT * Math.max(0, row.length - 1)
        )
    );

    const pxPerFoot = usableWidth / widestRowFeet;

    return (
        <Stack
            ref={containerRef}
            sx={{ px: 4 }}
            onContextMenu={(e) => e.preventDefault()}
        >
            {plantRows.map((rowPlants, rowIndex) => {
                const maxPlantHeight = Math.max(...rowPlants.map(p => p.avgHeight ?? 0));
                const yFeetRange = maxPlantHeight + 1;

                const chartHeight = yFeetRange * pxPerFoot + MARGIN.top + MARGIN.bottom;

                return (
                    <ChartContainer
                    key={rowIndex}
                        width={containerWidth}
                        height={chartHeight}
                        margin={MARGIN}
                        xAxis={[
                            {
                                id: 'x',
                                scaleType: 'linear',
                                min: 0,
                                max: widestRowFeet,
                                tickMinStep: 1,
                                tickMaxStep: 1,
                                valueFormatter: (v) => `${v}′`,
                            },
                        ]}
                        yAxis={[
                            {
                                id: 'y',
                                scaleType: 'linear',
                                min: 0,
                                max: yFeetRange,
                                tickMinStep: 1,
                                tickMaxStep: 1,
                                valueFormatter: (v) => `${v}′`,
                            },
                        ]}
                    >
                        <ChartsXAxis />
                        <ChartsYAxis />

                        <ChartsGrid horizontal />

                        <PlantRenderer plants={rowPlants} spacingFt={SPACING_FT} />
                    </ChartContainer>
                );
            })}
        </Stack>
    );
};
