import { iconMap } from "@/theme/icons";
import { BLOOM_MONTHS } from "@/types/plant";

interface BloomMonthIndicatorProps {
  bloomMonths: string[];
  flowerColors: string[];
  x: number;
  y: number;
  height?: number;
  width?: number;
}

const FLOWER_ICON_SIZE = 16;
const FLOWER_ICON_GAP = 2;

export const BloomMonthIndicator = ({
  bloomMonths,
  flowerColors = [],
  x,
  y,
  height = 24,
  width = 150,
}: BloomMonthIndicatorProps) => {
  const columnWidth = width / BLOOM_MONTHS.length;

  const totalIconsWidth =
    flowerColors.length * FLOWER_ICON_SIZE +
    (flowerColors.length - 1) * FLOWER_ICON_GAP;

  const iconsStartX = x + (width / 2) - (totalIconsWidth / 2);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke="#777"
        strokeWidth={0.5}
        opacity={0.3}
      />

      {/* Render each flower color icon */}
      {flowerColors?.map((color, index) => {
        const icon = iconMap.flowerColor[color];
        if (!icon) return null;

        const iconX = iconsStartX + index * (FLOWER_ICON_SIZE + FLOWER_ICON_GAP);

        return (
          <image
            key={`${color}-${index}`}
            href={icon.src}
            x={iconX}
            y={y - FLOWER_ICON_SIZE - 4}
            width={FLOWER_ICON_SIZE}
            height={FLOWER_ICON_SIZE}
          />
        );
      })}

      {BLOOM_MONTHS.map((month, i) => {
        const isBloom = bloomMonths.includes(month);
        const cx = x + i * columnWidth + columnWidth / 2;
        const cy = y + height / 2;
        return (
          <g key={month}>
            {isBloom && (
              <rect
                x={x + i * columnWidth}
                y={y}
                width={columnWidth}
                height={height}
                fill="#fecd01"
                opacity={0.8}
              />
            )}
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={9}
              fill={isBloom ? '#333' : '#aaa'}
              transform={`rotate(-90, ${cx}, ${cy})`}
            >
              {month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()}
            </text>
          </g>
        );
      })}
    </g>
  );
};