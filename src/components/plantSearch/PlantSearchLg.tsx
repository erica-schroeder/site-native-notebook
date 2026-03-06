import { usePlantFilter } from '@/contexts/PlantFilterContext';
import { Button, Stack } from '@mui/material';
import React from 'react';
import { BloomMonthSelect } from '../filter/BloomMonthSelect';
import { FlowerColorSelect } from '../filter/FlowerColorSelect';
import { HeightRangeSlider } from '../filter/HeightRangeSlider';
import { HostPlantSelect } from '../filter/HostPlantSelect';
import { PlantNameSearch } from '../filter/PlantNameSearch';
import { SoilMoistureSelect } from '../filter/SoilMoistureSelect';
import { SunLevelSelect } from '../filter/SunLevelSelect';
import { TraitSelect } from '../filter/TraitSelect';

export const PlantSearchLg: React.FC = () => {
  const { clearFilters } = usePlantFilter();

  return (
    <Stack spacing={1} alignItems={"stretch"} sx={{ maxWidth: 900 }}>
      <Stack direction="row" spacing={5} alignItems="flex-start" justifyContent="space-between" sx={{ pb: 2 }}>

        <SunLevelSelect />
        <SoilMoistureSelect />
        <TraitSelect />
        <HeightRangeSlider />

      </Stack>

      <Stack direction="row" spacing={5} alignItems="center" justifyContent="center" sx={{ pb: 2 }}>

        <FlowerColorSelect />
        <BloomMonthSelect />

      </Stack>

      <Stack direction="row" spacing={5} alignItems="center" justifyContent="stretch" sx={{ pb: 2, flex: 1 }}>
        <HostPlantSelect />
        <PlantNameSearch />
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          onClick={clearFilters}
          fullWidth={false}
        >
          Clear Filters
        </Button>
      </Stack>
    </Stack>
  );
};
