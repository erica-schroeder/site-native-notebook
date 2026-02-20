import { plantsWithAverages } from "@/data/plants";
import type { Color, Plant, SoilMoisture, SunLevel } from "@/types/plant";
import type { PlantFilters } from "@/types/plantFilters";
import Fuse from "fuse.js";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { isEqual } from 'lodash-es';

const PlantFilterContext = createContext(null);

const emptyFilters = {
    searchQuery: '',
    flowerColors: undefined,
    heightRange: [0, 10],
    sunLevels: [],
    soilMoistures: [],
};

export const PlantFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plantsWithAverages);
  const [filters, setFilters] = useState<PlantFilters>({...emptyFilters, searchQuery: 'asclepias'});

  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Fuse initialized once per plant list
  const fuse = useMemo(() => {
    return new Fuse(plantsWithAverages, {
      keys: ['commonName', 'scientificName'],
      threshold: 0.3,
      ignoreLocation: true,
    });
  }, [plantsWithAverages]);


  const applyFilters = () => {
    let result = plantsWithAverages;

    // Name-based search
    if (filters.searchQuery) {
      result = fuse.search(filters.searchQuery).map(r => r.item);
    }

    // Flower color filter
    if (filters.flowerColors?.length > 0) {
      result = result.filter(p =>
        p.flowerColor?.some(c =>
          filters.flowerColors.includes(c)
        )
      );
    }

    // Sun filter
    if (filters.sunLevels?.length > 0) {
      result = result.filter(p =>
        p.sun?.some(c =>
          filters.sunLevels.includes(c)
        )
      );
    }

    // Soil moisture filter
    if (filters.soilMoistures?.length > 0) {
      result = result.filter(p =>
        p.soilMoisture?.some(c =>
          filters.soilMoistures.includes(c)
        )
      );
    }

    // Height range filter
    if (filters.heightRange) {
      const [min, max] = filters.heightRange;
      result = result.filter(p =>
        p.heightFt.max >= min && p.heightFt.min <= max
      );
    }

    setFilteredPlants(result);
  };

  const clearFilters = () => {
    setFilteredPlants(plantsWithAverages);
    setFilters(emptyFilters);
  };

  const value = {
    filters,
    applyFilters,
    clearFilters,
    setSearchQuery: (searchQuery: string) => setFilters(f => ({ ...f, searchQuery })),
    setFlowerColors: (flowerColors: Color[]) => setFilters(f => ({ ...f, flowerColors })),
    setSunLevels: (sunLevels: SunLevel[]) => setFilters(f => ({ ...f, sunLevels })),
    setSoilMoistures: (soilMoistures: SoilMoisture[]) => setFilters(f => ({ ...f, soilMoistures })),
    setHeightRange: (heightRange: [number, number]) => setFilters(f => ({ ...f, heightRange })),
    filteredPlants,
    areFiltersEmpty: () => isEqual(filters, emptyFilters),
  };

  return (
    <PlantFilterContext.Provider value={value}>
      {children}
    </PlantFilterContext.Provider>
  );
};


export const usePlantFilter = () => {
  const ctx = useContext(PlantFilterContext);
  if (!ctx) throw new Error('usePlantFilter must be used inside a PlantFilter context provider.');
  return ctx;
};
