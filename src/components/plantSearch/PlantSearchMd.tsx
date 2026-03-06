import { usePlantFilter } from '@/contexts/PlantFilterContext';
import { Button, FormLabel, Stack } from '@mui/material';
import React from 'react';
import { BloomMonthSelect } from '../filter/BloomMonthSelect';
import { FlowerColorSelect } from '../filter/FlowerColorSelect';
import { HeightRangeSlider } from '../filter/HeightRangeSlider';
import { HostPlantSelect } from '../filter/HostPlantSelect';
import { PlantNameSearch } from '../filter/PlantNameSearch';
import { SoilMoistureSelect } from '../filter/SoilMoistureSelect';
import { SunLevelSelect } from '../filter/SunLevelSelect';
import { TraitSelect } from '../filter/TraitSelect';

const Label = (props) =>
  <FormLabel
    sx={{ fontSize: 14 }}
    {...props}
  />

export const PlantSearchMd: React.FC = () => {
  const { clearFilters } = usePlantFilter();

  return (
    <Stack spacing={2} alignItems={"stretch"} sx={{ maxWidth: 800 }}>
      <Stack direction="row" justifyContent="space-between">
        <SunLevelSelect size="md" />
        <SoilMoistureSelect size="md" />
        <TraitSelect size="md" />
      </Stack>

      <HeightRangeSlider size="md" />

      <FlowerColorSelect size="md" />

      <BloomMonthSelect size="md" />

      <HostPlantSelect size="md" />

      <PlantNameSearch size="md" />

      <Stack direction="row" justifyContent="center" sx={{ pt: 2 }}>
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
