import { usePlantFilter } from '@/contexts/PlantFilterContext';
import { Box, Button, Stack } from '@mui/material';
import React from 'react';
import { BloomMonthSelect } from '../filter/BloomMonthSelect';
import { FlowerColorSelect } from '../filter/FlowerColorSelect';
import { HeightRangeSlider } from '../filter/HeightRangeSlider';
import { HostPlantSelect } from '../filter/HostPlantSelect';
import { PlantNameSearch } from '../filter/PlantNameSearch';
import { SoilMoistureSelect } from '../filter/SoilMoistureSelect';
import { SunLevelSelect } from '../filter/SunLevelSelect';
import { TraitSelect } from '../filter/TraitSelect';

export const PlantSearchXs: React.FC = () => {
  const { clearFilters } = usePlantFilter();

  return (
    <Stack spacing={2} alignItems={"stretch"} sx={{ maxWidth: 800 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <SunLevelSelect size="xs" />
        <SoilMoistureSelect size="xs" />
        <TraitSelect size="xs" />
      </Stack>

      <HeightRangeSlider size="xs" />

      <FlowerColorSelect size="xs" />

      <BloomMonthSelect size="xs" />

      <HostPlantSelect size="xs" fontSize={12} />

      <PlantNameSearch
        size="xs"
        InputProps={{
          sx: {
            height: 36,
            fontSize: 12,
          },
        }}
      />

      <Stack direction="row" justifyContent="center" sx={{ pt: 2 }}>
        <Button
          variant="contained"
          onClick={clearFilters}
          fullWidth={false}
          size="small"
        >
          Clear Filters
        </Button>
      </Stack>
    </Stack>
  );
};
