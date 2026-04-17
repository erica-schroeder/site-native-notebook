import { usePlantDetailDisplay } from '@/contexts/PlantDetailDisplayContext';
import { useXScale, useYScale } from '@mui/x-charts';
import { BloomMonthIndicator } from './BloomMonthIndicator';
import { HostPlantIndicator } from './HostPlantIndicator';
import { PlantLabel } from './PlantLabel';
import { PlantPlaceholder } from './PlantPlaceholder';

const HOST_PLANT_INDICATOR_SIZE = 48;
const LABEL_Y_OFFSET = 15;
const BLOOM_OVERLAY_WIDTH_FT = 1.9;

export const PlantRenderer = ({
  plant,
  plantXPx,
  plantYPx,
  widthPx,
  heightPx,
  slotCenterPx,
  chartHeightPx
}) => {
  const { setActivePlant } = usePlantDetailDisplay();
  const xScale = useXScale('x');
  const yScale = useYScale('y');

  const labelXPx = slotCenterPx;
  const labelYPx = plantYPx + heightPx + LABEL_Y_OFFSET;

  const bloomWidthPx = xScale(BLOOM_OVERLAY_WIDTH_FT) - xScale(0);
  const bloomXPx = slotCenterPx - bloomWidthPx / 2;
  const bloomYPx = chartHeightPx;

  return (
    <g key={plant.id}>
      {plant.illustration?.svg ? (
        <image
          key={plant.id}
          href={`${import.meta.env.BASE_URL}illustrations/${plant.illustration.svg}`}
          x={plantXPx}
          y={plantYPx}
          width={widthPx}
          height={heightPx}
          preserveAspectRatio="none"
          style={{ cursor: 'pointer' }}
          onClick={() => setActivePlant(plant)}
        //preserveAspectRatio="xMidYMax meet"
        />
      ) : (
        <g
          style={{ cursor: 'pointer' }}
          onClick={() => setActivePlant(plant)}
        >
          <PlantPlaceholder
            key={plant.id}
            x={plantXPx}
            y={plantYPx}
            widthPx={widthPx}
            heightPx={heightPx}
            flowerColors={plant.flowerColor ?? ['grey']}
          />
        </g>
      )}
      <line
        x1={plantXPx}
        x2={plantXPx + widthPx}
        y1={yScale(plant.heightFt.max)}
        y2={yScale(plant.heightFt.max)}
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="4 4"
        opacity={0.8}
      />

      <line
        x1={plantXPx}
        x2={plantXPx + widthPx}
        y1={yScale(plant.heightFt.min)}
        y2={yScale(plant.heightFt.min)}
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="4 4"
        opacity={0.8}
      />

      <PlantLabel plant={plant} x={labelXPx} y={labelYPx} />
      <HostPlantIndicator plant={plant} size={HOST_PLANT_INDICATOR_SIZE} x={plantXPx} y={plantYPx - HOST_PLANT_INDICATOR_SIZE} />
      <BloomMonthIndicator bloomMonths={plant.bloomMonths} flowerColors={plant.flowerColor} width={bloomWidthPx} x={bloomXPx} y={bloomYPx} />
    </g>
  );
}
