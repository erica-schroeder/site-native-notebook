import { ChartsSurface, useXScale, useYScale } from '@mui/x-charts';
import { PlantLabel } from './PlantLabel';
import { usePlantDetailDisplay } from '@/contexts/PlantDetailDisplayContext';
import { HostPlantIndicator } from './HostPlantIndicator';

export const PlantRenderer = ({ plants, spacingFt=.5 }) => {
  const { setActivePlant } = usePlantDetailDisplay();

  const xScale = useXScale('x');
  const yScale = useYScale('y');

  if (!xScale || !yScale) return null;

  let cumulativeFeet = 0;
  const baselineY = yScale(0);
  const labelYOffset = 15; // px below x-axis

  return (
    <ChartsSurface>
      {plants.map((p, i) => {
        const widthFeet = p.illustration?.widthFt ?? p.avgWidth ?? 1;
        const heightFeet = p.illustration?.heightFt ?? p.avgHeight ?? 1;

        const plantStartFeet = cumulativeFeet;
        const plantCenterFeet = plantStartFeet + widthFeet / 2;

        const xPx = xScale(cumulativeFeet);
        const centerXPx = xScale(plantCenterFeet);
        const labelXPx = centerXPx;

        const widthPx =
          xScale(cumulativeFeet + widthFeet) - xScale(cumulativeFeet);

        const heightPx = yScale(0) - yScale(heightFeet);
        const topY = baselineY - heightPx;

        // Advance feet AFTER computing current plant
        cumulativeFeet += Math.max(widthFeet, 1);

        // Add spacing only BETWEEN plants
        if (i < plants.length - 1) {
          cumulativeFeet += spacingFt;
        }

        const hostPlantIndicatorSize = 48;

        // return SVG image or rectangle placeholder
        return (
            <g key={p.id}>
              {p.illustration?.svg ? (
              <image
                key={p.id}
                href={`${import.meta.env.BASE_URL}${p.illustration.svg}`}
                x={xPx}
                y={topY}
                width={widthPx}
                height={heightPx}
                preserveAspectRatio="none"
                onClick={() => setActivePlant(p)}
                //preserveAspectRatio="xMidYMax meet"
              />
            ) : (
              <rect
                key={p.id}
                x={xPx}
                y={topY}
                width={widthPx}
                height={heightPx}
                fill="green"
                stroke="black"
                onClick={() => setActivePlant(p)}
              />
            )}
            <line
              x1={xPx}
              x2={xPx + widthPx}
              y1={yScale(p.heightFt.max)}
              y2={yScale(p.heightFt.max)}
              stroke="currentColor"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.6}
            />

            <line
              x1={xPx}
              x2={xPx + widthPx}
              y1={yScale(p.heightFt.min)}
              y2={yScale(p.heightFt.min)}
              stroke="currentColor"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.6}
            />

            <PlantLabel plant={p} x={labelXPx} y={baselineY + labelYOffset} />
            <HostPlantIndicator plant={p} size={hostPlantIndicatorSize} x={xPx} y={topY - hostPlantIndicatorSize} />
          </g>
        );
      })}
    </ChartsSurface>
  );
}
