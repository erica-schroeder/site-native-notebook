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

const Label = (props) =>
  <FormLabel
    sx={{ fontSize: 14 }}
    {...props}
  />

export const PlantSearchMd: React.FC = () => {
  const { clearFilters } = usePlantFilter();

  return (
    <Stack spacing={2} alignItems={"stretch"} sx={{ maxWidth: 800 }}>
      <FormControl>
        <Label>
          Common or Scientific Name
        </Label>
        <PlantNameSearch />
      </FormControl>

      <FormControl sx={{ minWidth: 200, pr: 1 }}>
        <Label>
          Height range (feet)
        </Label>
        <HeightRangeSlider />
      </FormControl>

      <FlowerColorSelect size="md" />

      <Stack direction="row" justifyContent="space-between">
          <SunLevelSelect size="md" />
          <SoilMoistureSelect size="md" />
          <TraitSelect size="md" />
      </Stack>

      <HostPlantSelect size="md" />

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
