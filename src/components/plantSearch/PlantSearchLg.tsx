import { usePlantFilter } from '@/contexts/PlantFilterContext';
import { Button, FormControl, FormLabel, Stack } from '@mui/material';
import React from 'react';
import { FlowerColorSelect } from '../filter/FlowerColorSelect';
import { HeightRangeSlider } from '../filter/HeightRangeSlider';
import { PlantNameSearch } from '../filter/PlantNameSearch';
import { SoilMoistureSelect } from '../filter/SoilMoistureSelect';
import { SunLevelSelect } from '../filter/SunLevelSelect';
import { TraitSelect } from '../filter/TraitSelect';
import { HostPlantSelect } from '../filter/HostPlantSelect';

export const PlantSearchLg: React.FC = () => {
  const { clearFilters } = usePlantFilter();

  return (
    <Stack spacing={1} alignItems={"stretch"} sx={{ maxWidth: 800 }}>
      <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between" sx={{ pb: 2 }}>

        <FormControl>
          <FormLabel>
            Common or Scientific Name
          </FormLabel>
          <PlantNameSearch />
        </FormControl>

        <FlowerColorSelect />

      </Stack>

      <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between" sx={{ pb: 2 }}>
        <FormControl sx={{ minWidth: 300, pr: 1 }}>
          <FormLabel sx={{ mb: -1 }}>
            Height Range (feet)
          </FormLabel>
          <HeightRangeSlider />
        </FormControl>

        <SunLevelSelect />
        <SoilMoistureSelect />

      </Stack>

      <Stack direction="row" spacing={5} alignItems="center" justifyContent="center" sx={{ pb: 2 }}>
        <TraitSelect />
        <HostPlantSelect />
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
