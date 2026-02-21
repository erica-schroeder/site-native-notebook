import { iconMap } from "@/theme/icons"
import type { Plant } from "@/types/plant"

type TraitIndicatorsProps = {
    x: number
    y: number
    plant: Plant
}

export const TraitIndicators = ({ x, y, plant }: TraitIndicatorsProps) => {
  const rowBaseSize = 14 // single base size for sun & soil

    return (
        <>
        {plant.traits?.keystone &&
                    <image
                        href={iconMap.traits.keystone.src}
                        x={x}
                        y={y - rowBaseSize / 2} // vertically center on y
                        width={rowBaseSize * (iconMap.traits.keystone.opticalScale ?? 1)}
                        height={rowBaseSize * (iconMap.traits.keystone.opticalScale ?? 1)}
                    />
        }
</>
    );
}