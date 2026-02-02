import { useChartFilter } from '@/contexts/ChartFilterProvider';
import { Button, Stack, TextField } from '@mui/material';
import React from 'react';
import { FlowerColorSelect } from './FlowerColorSelect';
import { HeightRangeSlider } from './HeightRangeSlider';


export const PlantSearch: React.FC = () => {
  const { filters, applyFilters, setSearchQuery, setFlowerColors, setHeightRange } = useChartFilter();

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={4} alignItems="center" sx={{ pb: 2 }}>
        <TextField
          label="Common/scientific name contains"
          value={filters.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />

        <FlowerColorSelect
          onChange={setFlowerColors}
          value={filters.flowerColors}
        />

        <HeightRangeSlider
          onChange={setHeightRange}
          value={filters.heightRange}
        />
      </Stack>

      <Button
      variant="contained"
      onClick={applyFilters}
      fullWidth={false}
      >
        Search
      </Button>
    </Stack>
  );
};
