export const PlantLabel = ({plant, x, y}) => {
    return (
        <text
            x={x}
            y={y}
            fontSize={12}
            textAnchor="start"
            transform={`rotate(45, ${x}, ${y})`}
            fill="#333"
        >
            <tspan fontWeight="bold">{plant.commonName}</tspan>
            {plant.scientificName && (
                <tspan x={x} dy="1.2em" fontStyle="italic">
                    {plant.scientificName}
                </tspan>
            )}
        </text>
    );
}