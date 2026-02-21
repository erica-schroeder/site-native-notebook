import type { Plant } from "@/types/plant"
import { PlantName } from "./PlantName"
import { SunSoilIndicators } from "./SunSoilIndicators"
import { TraitIndicators } from "./TraitIndicators"

type PlantLabelProps = {
  x: number
  y: number
  plant: Plant
}

export const PlantLabel = ({ x, y, plant }: PlantLabelProps) => {
  const iconRowY = y + 30;

    return (
        <g transform={`rotate(45, ${x}, ${y})`}>
            <PlantName x={x} y={y} plant={plant} />
            <SunSoilIndicators x={x} y={iconRowY} plant={plant} />
            <TraitIndicators x={x} y={iconRowY + 20} plant={plant} />
        </g>
    )
}