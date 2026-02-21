import type { Plant } from "@/types/plant"

type PlantNameProps = {
  x: number
  y: number
  plant: Plant
}

export const PlantName = ({ x, y, plant }: PlantNameProps) => {
  return (
      <text x={x} y={y} fontSize={12} textAnchor="start" fill="#333">
        <tspan fontWeight="bold">{plant.commonName}</tspan>
        {plant.scientificName && (
          <tspan x={x} dy="1.2em" fontStyle="italic">
            {plant.scientificName}
          </tspan>
        )}
      </text>
  )
}