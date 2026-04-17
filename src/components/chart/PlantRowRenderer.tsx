import { ChartsSurface, useXScale, useYScale } from '@mui/x-charts';
import { PlantLabel } from './PlantLabel';
import { usePlantDetailDisplay } from '@/contexts/PlantDetailDisplayContext';
import { HostPlantIndicator } from './HostPlantIndicator';
import { PlantPlaceholder } from './PlantPlaceholder';
import { BloomMonthIndicator } from './BloomMonthIndicator';
import { PlantRenderer } from './PlantRenderer';

const HOST_PLANT_INDICATOR_SIZE = 48;
const LABEL_Y_OFFSET = 15;

export const PlantRowRenderer = ({ plants, spacingFt=.5, minWidthFt = 1, maxHeight }) => {
  const { setActivePlant } = usePlantDetailDisplay();

  const xScale = useXScale('x');
  const yScale = useYScale('y');

  if (!xScale || !yScale) return null;

  let cumulativeFeet = 0;
  const baselineY = yScale(0);

  return (
    <ChartsSurface>
      {plants.map((p, i) => {
        const plantWidthFt = p.illustration?.widthFt ?? p.avgWidth ?? 1;
        const plantHeightFt = p.illustration?.heightFt ?? p.avgHeight ?? 1;

        // The slot is the LARGER of the plant width or the required minWidth
        const slotWidthFt = Math.max(plantWidthFt, minWidthFt);

        // Calculate the center of the slot in pixels
        const slotStartPx = xScale(cumulativeFeet);
        const slotWidthPx = xScale(cumulativeFeet + slotWidthFt) - slotStartPx;
        const slotCenterPx = slotStartPx + slotWidthPx / 2;

        // Calculate actual plant drawing dimensions
        const plantWidthPx = xScale(cumulativeFeet + plantWidthFt) - slotStartPx;
        const plantHeightPx = baselineY - yScale(plantHeightFt);

        // Center the plant illustration inside the slot
        const plantXPx = slotCenterPx - plantWidthPx / 2;
        const plantTopY = baselineY - plantHeightPx;


        // Advance feet AFTER computing current plant
        cumulativeFeet += slotWidthFt;

        // Add spacing only BETWEEN plants
        if (i < plants.length - 1) {
          cumulativeFeet += spacingFt;
        }

        return (
          <PlantRenderer
            key={p.id}
            plant={p}
            plantXPx={plantXPx}
            plantYPx={plantTopY}
            widthPx={plantWidthPx}
            heightPx={plantHeightPx}
            slotCenterPx={slotCenterPx} // Passed for centering overlays
            chartHeightPx={maxHeight}
          />
        )


        // return SVG image or rectangle placeholder
        return (
            <g key={p.id}>
              {p.illustration?.svg ? (
              <image
                key={p.id}
                href={`${import.meta.env.BASE_URL}illustrations/${p.illustration.svg}`}
                x={xPx}
                y={topY}
                width={widthPx}
                height={heightPx}
                preserveAspectRatio="none"
                style={{ cursor: 'pointer' }}
                onClick={() => setActivePlant(p)}
                //preserveAspectRatio="xMidYMax meet"
              />
            ) : (
              <g
                style={{ cursor: 'pointer' }}
                onClick={() => setActivePlant(p)}
              >
                <PlantPlaceholder
                  key={p.id}
                  x={xPx}
                  y={topY}
                  widthPx={widthPx}
                  heightPx={heightPx}
                  flowerColors={p.flowerColor ?? ['grey']}
                />
              </g>
            )}
            <line
              x1={xPx}
              x2={xPx + widthPx}
              y1={yScale(p.heightFt.max)}
              y2={yScale(p.heightFt.max)}
              stroke="currentColor"
              strokeWidth={2}
              strokeDasharray="4 4"
              opacity={0.8}
            />

            <line
              x1={xPx}
              x2={xPx + widthPx}
              y1={yScale(p.heightFt.min)}
              y2={yScale(p.heightFt.min)}
              stroke="currentColor"
              strokeWidth={2}
              strokeDasharray="4 4"
              opacity={0.8}
            />

            <PlantLabel plant={p} x={labelXPx} y={baselineY + LABEL_Y_OFFSET} />
            <HostPlantIndicator plant={p} size={HOST_PLANT_INDICATOR_SIZE} x={xPx} y={topY - HOST_PLANT_INDICATOR_SIZE} />
            <BloomMonthIndicator bloomMonths={p.bloomMonths} flowerColors={p.flowerColor ?? "white"} width={150} x={xPx + widthPx / 2 - 150 / 2} y={maxHeight + 40} />
          </g>
        );
      })}
    </ChartsSurface>
  );
}
