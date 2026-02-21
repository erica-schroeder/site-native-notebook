import { iconMap } from "@/theme/icons"
import { IconRow } from "./IconRow"
import type { Plant, SoilMoisture, SunLevel } from "@/types/plant"

type SunSoilIndicatorsProps = {
  x: number
  y: number
  plant: Plant
}

const sunOrder: SunLevel[] = ["full", "part", "shade"];
const soilOrder: SoilMoisture[] = ["wet", "med", "dry"];

export const SunSoilIndicators = ({ x, y, plant }: SunSoilIndicatorsProps) => {
  const spacing = 4
  const gapBetweenGroups = 20
  const iconBaseSize = 12 // single base size for sun & soil

    const sunIcons = sunOrder
        .filter(level => plant.sun.includes(level))
        .map(level => iconMap.sun[level])

    const soilIcons = soilOrder
        .filter(level => plant.soilMoisture.includes(level))
        .map(level => iconMap.soil[level])

  // Compute total width of sun icons row for divider
  const sunWidth = sunIcons.reduce((acc, icon) => acc + iconBaseSize * (icon.chartScale ?? 1) + spacing, -spacing)

  const dividerX = x + sunWidth + gapBetweenGroups / 2

  return (
    <>
      {/* Sun icons */}
      <IconRow
        x={x}
        y={y}
        icons={sunIcons}
        baseSize={iconBaseSize}
        spacing={spacing}
      />

      {/* Divider line */}
      <line
        x1={dividerX}
        y1={y - iconBaseSize / 2} // start at top of row
        x2={dividerX}
        y2={y + iconBaseSize / 2} // bottom of row
        stroke="#666"
        strokeWidth={1}
        strokeLinecap="round"
      />

      {/* Soil icons */}
      <IconRow
        x={x + sunWidth + gapBetweenGroups}
        y={y}
        icons={soilIcons}
        baseSize={iconBaseSize}
        spacing={spacing}
      />
    </>
  )
};