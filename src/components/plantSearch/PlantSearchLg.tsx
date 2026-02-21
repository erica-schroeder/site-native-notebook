import { usePlantFilter } from '@/contexts/PlantFilterContext';
import { Button, FormControl, FormLabel, Stack } from '@mui/material';
import React from 'react';
import { FlowerColorSelect } from '../filter/FlowerColorSelect';
import { HeightRangeSlider } from '../filter/HeightRangeSlider';
import { PlantNameSearch } from '../filter/PlantNameSearch';
import { SoilMoistureSelect } from '../filter/SoilMoistureSelect';
import { SunLevelSelect } from '../filter/SunLevelSelect';
import { TraitIndicators } from '../chart/TraitIndicators';
import { TraitSelect } from '../filter/TraitSelect';

export const PlantSearchLg: React.FC = () => {
  const { clearFilters } = usePlantFilter();

  return (
    <Stack spacing={1} alignItems={"stretch"} sx={{ maxWidth: 800 }}>
      <Stack direction={{xs: "column", sm: "row"}} spacing={5} alignItems="center" justifyContent="space-between" sx={{ pb: 2 }}>

        <FormControl>
          <FormLabel>
            Common or Scientific Name
          </FormLabel>
          <PlantNameSearch />
        </FormControl>

        <FormControl>
          <FormLabel>
            Flower Colors
          </FormLabel>
          <FlowerColorSelect />
        </FormControl>

      </Stack>

      <Stack direction={{xs: "column", sm: "row"}} spacing={5} alignItems="center" justifyContent="space-between" sx={{ pb: 2 }}>
        <FormControl sx={{ minWidth: 300, pr: 1 }}>
          <FormLabel sx={{ mb: -1 }}>
            Height Range (feet)
          </FormLabel>
          <HeightRangeSlider />
        </FormControl>
        <FormControl>
          <FormLabel>
            Sun Level
          </FormLabel>
          <SunLevelSelect />
        </FormControl>

        <FormControl>
          <FormLabel>
            Soil Moisture
          </FormLabel>
          <SoilMoistureSelect />
        </FormControl>

      </Stack>

      <Stack direction={{xs: "column", sm: "row"}} spacing={5} alignItems="center" justifyContent="space-between" sx={{ pb: 2 }}>
        <FormControl>
          <FormLabel>
            Traits
          </FormLabel>
          <TraitSelect />
        </FormControl>
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
