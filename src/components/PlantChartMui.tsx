import { plantsWithAverages } from '@/data/plants';
import {
    ChartContainer,
    ChartsGrid,
    ChartsXAxis,
    ChartsYAxis,
} from '@mui/x-charts';
import { sortBy } from 'lodash-es';
import { PlantRenderer } from './PlantRenderer';

const CHART_WIDTH = 2000;
const CHART_HEIGHT = 800;
const MARGIN = { left: 60, right: 20, top: 20, bottom: 50 };

const drawableWidth = CHART_WIDTH - MARGIN.left - MARGIN.right;
const drawableHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom;

const xFeetRange = 20;
const pxPerFoot = drawableWidth / xFeetRange;

const yFeetRange = drawableHeight / pxPerFoot;

export const PlantChartMui = () => {
    return (
        <ChartContainer
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            margin={MARGIN}
            xAxis={[
                {
                    id: 'x',
                    scaleType: 'linear',
                    min: 0,
                    max: xFeetRange,
                    tickMinStep: 1,
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
                    valueFormatter: (v) => `${v}′`,
                },
            ]}
        >
            <ChartsXAxis label="Width (feet)" />
            <ChartsYAxis label="Height (feet)" />

            <ChartsGrid horizontal />

            <PlantRenderer plants={sortBy(plantsWithAverages, 'avgHeight').reverse()} pxPerFoot={pxPerFoot} />
        </ChartContainer>
    );
};
