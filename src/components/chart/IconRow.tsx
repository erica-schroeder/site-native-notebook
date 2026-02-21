import type { IconConfig } from "@/theme/icons";

type IconRowProps = {
  x: number
  y: number
  spacing?: number
  baseSize: number
  icons: IconConfig[]
}

export const IconRow = ({ x, y, icons, baseSize, spacing = 4 }: IconRowProps) => {
  let offsetX = 0

  return (
    <>
      {icons.map(icon => {
        const scale = icon.chartScale ?? 1
        const size = baseSize * scale
        const iconX = x + offsetX
        offsetX += size + spacing

        return (
          <image
            key={icon.src}
            href={icon.src}
            x={iconX}
            y={y - size / 2} // vertically center on y
            width={size}
            height={size}
          />
        )
      })}
    </>
  )
}