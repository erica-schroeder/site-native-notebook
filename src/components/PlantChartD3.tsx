import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Popover, Typography } from '@mui/material';
import { plantsWithAverages } from '@/data/plants';

const plants = plantsWithAverages;

const PlantChartD3: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartGroupRef = useRef<SVGGElement>(null);

  const [tooltipPlant, setTooltipPlant] = useState<Plant | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const chartWidth = 2000;
  const chartHeight = 500;
  const plantSpacing = 1; // feet

  // Compute cumulative X positions
  const plantPositions = plants.map((p, i) => {
    const x = plants.slice(0, i).reduce((sum, prev) => sum + prev.avgWidth + plantSpacing, 0);
    return { ...p, x };
  });

  const maxX = plantPositions[plantPositions.length - 1].x + plantPositions[plantPositions.length - 1].avgWidth;
  const maxY = d3.max(plants, (p) => p.avgHeight) || 5;

  const xScale = d3.scaleLinear().domain([0, maxX]).range([50, chartWidth - 20]);
  const yScale = d3.scaleLinear().domain([0, maxY]).range([chartHeight - 50, 20]);

  // D3 zoom for the entire chart group
  useEffect(() => {
    if (!svgRef.current || !chartGroupRef.current) return;

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .filter((event) => event.ctrlKey)
      .on('zoom', (event) => {
        d3.select(chartGroupRef.current).attr('transform', event.transform.toString());
      });

    d3.select(svgRef.current).call(zoom);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent, plant: Plant) => {
    setTooltipPlant(plant);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipPlant(null);
    setTooltipPos(null);
  };

  return (
    <>
      <svg
        ref={svgRef}
        width={chartWidth}
        height={chartHeight}
        style={{ border: '1px solid #ccc' }}
        onContextMenu={(e) => e.preventDefault()}
      >
              <g ref={chartGroupRef}>
                  {/* X Axis (lines only, no numeric labels) */}
                  <g transform={`translate(0, ${chartHeight - 50})`}>
                      <line x1={0} x2={chartWidth} y1={0} y2={0} stroke="#000" />
                      {Array.from({ length: Math.ceil(maxX) + 1 }, (_, i) => {
                          const x = xScale(i);
                          return <line key={i} x1={x} x2={x} y1={0} y2={6} stroke="#000" />;
                      })}
                  </g>

          {/* Y Axis */}
          <g transform={`translate(50, 0)`}>
            <line x1={0} x2={0} y1={0} y2={chartHeight} stroke="#000" />
            {yScale.ticks(5).map((tick, i) => (
              <g key={i} transform={`translate(0, ${yScale(tick)})`}>
                <line x1={-6} x2={0} y1={0} y2={0} stroke="#000" />
                <text x={-10} y={4} fontSize={12} textAnchor="end">{tick} ft</text>
              </g>
            ))}
          </g>

          {/* Plants */}
          {plantPositions.map((plant, i) => {
            const x = xScale(plant.x);
            const y = yScale(plant.avgHeight);
            const width = xScale(plant.avgWidth) - xScale(0);
            const height = chartHeight - 50 - y;

            return (
              <g
                key={plant.id}
                transform={`translate(${x}, ${y})`}
                onMouseEnter={(e) => handleMouseEnter(e, plant)}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
              >
                    {plant.svg ? (
      <g transform={`scale(${width / 100}, ${height / 100})`}>
        {plant.svg}
      </g>
    ) : (
      <rect width={width} height={height} fill="green" />
    )}
              </g>
            );
          })}
        </g>
      </svg>

      <Popover
        open={Boolean(tooltipPlant)}
        anchorReference="anchorPosition"
        anchorPosition={tooltipPos || undefined}
        onClose={handleMouseLeave}
      >
        {tooltipPlant && (
          <div style={{ padding: 10 }}>
            <Typography variant="subtitle1">{tooltipPlant.name}</Typography>
            <Typography variant="body2">Height: {tooltipPlant.avgHeight} ft</Typography>
            <Typography variant="body2">Width: {tooltipPlant.avgWidth} ft</Typography>
          </div>
        )}
      </Popover>
    </>
  );
};

const PlantSVG: React.FC<{ width: number; height: number; plant: Plant }> = ({ width, height, plant }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
      {plant.svg}
    </svg>
  );
};

export default PlantChartD3;
