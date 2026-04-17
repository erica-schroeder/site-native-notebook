import { PlantRowRenderer } from '@/components/chart/PlantRowRenderer';
import { PlantDetailDisplayProvider } from '@/contexts/PlantDetailDisplayContext';
import { useZoom } from '@/contexts/ZoomContext';
import { useContainerWidth } from '@/hooks/useContainerWidth';
import type { Plant } from '@/types/plant';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import {
    ChartContainer,
    ChartsGrid,
    ChartsXAxis,
    ChartsYAxis,
} from '@mui/x-charts';
import { sortBy } from 'lodash-es';
import { useMemo } from 'react';

const MARGIN = { left: 0, right: 30, top: 20, bottom: 150 };
const SPACING_FT = 1;
const PLANT_MIN_WIDTH_FT = 2;

function splitPlantsIntoRows(plants: Plant[], maxFeetPerRow: number) {
    const rows: Plant[][] = [];
    let currentRow: Plant[] = [];
    let currentFeet = 0;

    const sortedPlants = sortBy(plants, 'avgHeight').reverse();

    for (const plant of sortedPlants) {
        const plantWidth = Math.max(plant.avgWidth, PLANT_MIN_WIDTH_FT);
        const nextWidth =
            currentRow.length === 0
                ? plantWidth
                : plantWidth + SPACING_FT;

        if (currentFeet + nextWidth > maxFeetPerRow) {
            rows.push(currentRow);
            currentRow = [];
            currentFeet = 0;
            currentFeet += plantWidth;
        }
        else {
            currentFeet += nextWidth;
        }

        currentRow.push(plant);
    }

    if (currentRow.length > 0) rows.push(currentRow);
    return rows;
}

export const PlantChartMui = ({ plants }) => {
    const { ref: containerRef, width: containerWidth } = useContainerWidth<HTMLDivElement>();
    const {zoomFactor} = useZoom();
    const usableWidth = containerWidth - MARGIN.left - MARGIN.right;

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    // Pick a base px/ft depending on screen size
    const basePxPerFoot = useMemo(() => {
        if (isXs) return 60;
        if (isSm) return 70;
        return 80;
    }, [isXs, isSm, isMdUp]);

    const effectivePxPerFoot = basePxPerFoot * zoomFactor;
    const maxFeetPerRow = Math.max(3, Math.floor(usableWidth / effectivePxPerFoot));

    const plantRows = splitPlantsIntoRows(plants, maxFeetPerRow);

    const widestRowFeet = Math.max(
        ...plantRows.map(row =>
            row.reduce((sum, p) => sum + (p.avgWidth ?? 1), 0)
            + SPACING_FT * Math.max(0, row.length - 1)
        )
    );

    const pxPerFoot = effectivePxPerFoot;//usableWidth / widestRowFeet;

    return (
        <Stack
            ref={containerRef}
            alignItems="center"
            onContextMenu={(e) => e.preventDefault()}
        >
            {plantRows.map((rowPlants, rowIndex) => {
                const maxPlantHeight = Math.max(...rowPlants.map(p => p.heightFt.max ?? 0));
                const yFeetRange = Math.max(maxPlantHeight) + 1;

                const chartHeight = yFeetRange * pxPerFoot + MARGIN.top + MARGIN.bottom;

                return (
                    <ChartContainer
                        key={rowIndex}
                        width={maxFeetPerRow * pxPerFoot + MARGIN.left + MARGIN.right}
                        height={chartHeight}
                        margin={MARGIN}
                        xAxis={[
                            {
                                id: 'x',
                                scaleType: 'linear',
                                min: 0,
                                max: maxFeetPerRow,
                                tickMinStep: 1,
                                tickMaxStep: 1,
                                tickLabelStyle: { display: "none" },
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

                        <PlantDetailDisplayProvider>
                            <PlantRowRenderer plants={rowPlants} spacingFt={SPACING_FT} maxHeight={yFeetRange + 24}
                            minWidthFt={PLANT_MIN_WIDTH_FT}
                            />
                        </PlantDetailDisplayProvider>
                    </ChartContainer>
                );
            })}
        </Stack>
    );
};
