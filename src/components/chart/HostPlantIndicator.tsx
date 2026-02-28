import { lepidoptera } from "@/data/lepidoptera";

export const HostPlantIndicator = ({
  plant,
  x,
  y,
  size = 48,
  spacing = 4,
}) => {

  const hostedCaterpillars = lepidoptera
  .filter(l => plant.hostCaterpillars?.includes(l.id));

  if (!hostedCaterpillars.length) return null;

  return (
    <g>
      {hostedCaterpillars.map((c, index) => (
        <image
          key={c.id}
          href={c.icon}
          x={x + index * (size + spacing)}
          y={y}
          width={size}
          height={size}
        />
      ))}
    </g>
  );
};