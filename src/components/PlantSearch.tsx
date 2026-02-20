import { usePlantFilter } from '@/contexts/PlantFilterProvider';
import { Button, FormControl, FormLabel, Stack, TextField } from '@mui/material';
import React from 'react';
import { FlowerColorSelect2 } from './filter/FlowerColorSelect2';
import { HeightRangeSlider } from './filter/HeightRangeSlider';
import { SoilMoistureSelect } from './filter/SoilMoistureSelect';
import { SunLevelSelect } from './filter/SunLevelSelect';

export const PlantSearch: React.FC = () => {
  const { filters, applyFilters, clearFilters, setSearchQuery, setFlowerColors, setHeightRange, setSunLevels, setSoilMoistures } = usePlantFilter();

  return (
    <Stack spacing={1} alignItems={"stretch"} sx={{ maxWidth: 800 }}>
      <Stack direction={{xs: "column", sm: "row"}} spacing={5} alignItems="center" justifyContent="space-between" sx={{ pb: 2 }}>

        {/* Name */}
        <FormControl>
          <FormLabel>
            Common or Scientific Name
          </FormLabel>
          <TextField
            placeholder="contains..."
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ minWidth: "40ch" }}
          />
        </FormControl>


        {/* Sun */}
        <FormControl>
          <FormLabel>
            Sun Level
          </FormLabel>
          <SunLevelSelect
            onChange={setSunLevels}
            value={filters.sunLevels}
          />
        </FormControl>

        {/* Soil */}
        <FormControl>
          <FormLabel>
            Soil Moisture
          </FormLabel>
          <SoilMoistureSelect
            onChange={setSoilMoistures}
            value={filters.soilMoistures}
          />
        </FormControl>

      </Stack>
      <Stack direction={{xs: "column", sm: "row"}} spacing={5} alignItems="center" justifyContent="space-between" sx={{ pb: 2 }}>
        {/* Height */}
        <FormControl sx={{ minWidth: 300, pr: 1 }}>
          <FormLabel sx={{ mb: -1 }}>
            Height range: {filters.heightRange[0]}′ – {filters.heightRange[1]}′
          </FormLabel>
          <HeightRangeSlider
            onChange={setHeightRange}
            value={filters.heightRange}
          />
        </FormControl>
        {/* Flower color */}
        <FormControl>
          <FormLabel>
            Flower Colors
          </FormLabel>
          <FlowerColorSelect2
            onChange={setFlowerColors}
            value={filters.flowerColors}
          />
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
