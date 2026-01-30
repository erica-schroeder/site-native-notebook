import { ChartsSurface, useXScale, useYScale } from '@mui/x-charts';
import { PlantLabel } from './PlantLabel';

export const PlantRenderer = ({ plants, spacingFt=.5 }) => {
  const xScale = useXScale('x');
  const yScale = useYScale('y');

  if (!xScale || !yScale) return null;

  let cumulativeFeet = 0;
  const baselineY = yScale(0);
  const labelYOffset = 15; // px below x-axis

  return (
    <ChartsSurface>
      {plants.map((p, i) => {
        const widthFeet = p.avgWidth ?? 1;
        const heightFeet = p.avgHeight ?? 1;

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
        cumulativeFeet += widthFeet;

        // Add spacing only BETWEEN plants
        if (i < plants.length - 1) {
          cumulativeFeet += spacingFt;
        }


        // return SVG image or rectangle placeholder
        return (
            <g key={p.id}>
              {p.svg ? (
              <image
                key={p.id}
                href={`${import.meta.env.BASE_URL}${p.svg}`}
                x={xPx}
                y={topY}
                width={widthPx}
                height={heightPx}
                preserveAspectRatio="none"
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
                onClick={() => window.alert("hi")}
              />
            )}

            <PlantLabel plant={p} x={labelXPx} y={baselineY + labelYOffset} />
          </g>
        );
      })}
    </ChartsSurface>
  );
}
