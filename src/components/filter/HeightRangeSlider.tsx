import { usePlantFilter } from '@/contexts/PlantFilterContext';
import { FormControl, FormLabel, Slider } from '@mui/material';
import { FilterLabel } from './FilterLabel';

const MIN_HEIGHT = 0;
const MAX_HEIGHT = 10;

const marks = Array.from({ length: MAX_HEIGHT - MIN_HEIGHT + 1 }, (_, i) => ({
  value: i + MIN_HEIGHT,
  label: `${i + MIN_HEIGHT}′`,
}));

export function HeightRangeSlider({ size, ...props }) {
  const { filters, setHeightRange } = usePlantFilter();

  const handleChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setHeightRange([newValue[0], newValue[1]]);
    }
  };

  return (
    <FormControl sx={{ minWidth: 300, pr: 1, flex: 1 }}>
      <FilterLabel size={size} >
        Height Range
      </FilterLabel>
      <Slider
        value={filters.heightRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={MIN_HEIGHT}
        max={MAX_HEIGHT}
        step={1}
        marks={marks}
        size="small"
        {...props}
      />
    </FormControl>
  );
}
