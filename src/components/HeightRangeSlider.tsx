import { FormControl, FormLabel, Slider, Stack, Typography } from '@mui/material';

const MIN_HEIGHT = 0;
const MAX_HEIGHT = 10;

const marks = Array.from({ length: MAX_HEIGHT - MIN_HEIGHT + 1 }, (_, i) => ({
  value: i + MIN_HEIGHT,
  label: `${i + MIN_HEIGHT}′`,
}));

export function HeightRangeSlider({ value, onChange }) {
  const handleChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onChange([newValue[0], newValue[1]]);
    }
  };

  return (
    //<Stack spacing={2} sx={{ minWidth: 300 }}>
      <FormControl sx={{ minWidth: 300, pr: 1}}>
          <FormLabel sx={{ mb: 1 }}>
              Height range: {value[0]}′ – {value[1]}′
          </FormLabel>
          <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={MIN_HEIGHT}
              max={MAX_HEIGHT}
              step={1}
              marks={marks}
              size="small"
          />
      </FormControl>
  );
}
