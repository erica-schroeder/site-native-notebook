import { plantsWithAverages } from '@/data/plants';
import { useContainerWidth } from '@/hooks/useContainerWidth';
import type { Plant } from '@/types/plant';
import { Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import {
    ChartContainer,
    ChartsGrid,
    ChartsXAxis,
    ChartsYAxis,
} from '@mui/x-charts';
import { sortBy } from 'lodash-es';
import { PlantRenderer } from './PlantRenderer';
import { useMemo, useState } from 'react';

const MARGIN = { left: 0, right: 70, top: 20, bottom: 150 };
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
    const [zoomFactor, setZoomFactor] = useState(1);
    const usableWidth = containerWidth - MARGIN.left - MARGIN.right;

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    // Pick a base px/ft depending on screen size
    const basePxPerFoot = useMemo(() => {
        if (isXs) return 40;
        if (isSm) return 70;
        return 80;
    }, [isXs, isSm, isMdUp]);

    const effectivePxPerFoot = basePxPerFoot * zoomFactor;
    const maxFeetPerRow = Math.max(3, Math.floor(usableWidth / effectivePxPerFoot));

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
            <Stack direction="row">
                <Button onClick={() => setZoomFactor(z => Math.min(z * 1.2, 3))}>zoom in</Button>
                <Button onClick={() => setZoomFactor(z => Math.max(z / 1.2, .5))}>zoom out</Button>
                <Button onClick={() => setZoomFactor(1)}>reset</Button>
            </Stack>
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

                        <PlantRenderer plants={rowPlants} spacingFt={SPACING_FT} />
                    </ChartContainer>
                );
            })}
        </Stack>
    );
};
