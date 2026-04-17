export const PlantPlaceholder = ({ x = 0, y = 0, heightPx, widthPx, flowerColors }) => {
    const padding = 4;
    const dotR = 6;
    const dotY = padding + dotR;
    const totalDotWidth = flowerColors?.length * (dotR * 2 + 2) - 2;
    const startX = (widthPx - totalDotWidth) / 2 + dotR;

    return (
        <g transform={`translate(${x},${y})`}>
            <rect
                x={0}
                y={0}
                width={widthPx}
                height={heightPx}
                fill="white"
                stroke="#7a9e7e"
                strokeWidth={1}
                strokeDasharray="1,3"
                rx={3}
            />
            <text
                x={widthPx / 2}
                y={heightPx / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fill="#7a9e7e"
                style={{ userSelect: 'none' }}
            >
                illustration
            </text>
            <text
                x={widthPx / 2}
                y={heightPx / 2 + 14}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fill="#7a9e7e"
                style={{ userSelect: 'none' }}
            >
                coming soon!
            </text>
        </g>
    );
};