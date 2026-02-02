import { plantsWithAverages } from "@/data/plants";
import type { Color, Plant } from "@/types/plant";
import type { PlantFilters } from "@/types/plantFilters";
import Fuse from "fuse.js";
import { createContext, type ReactNode, useContext, useMemo, useState } from "react";

const ChartFilterContext = createContext(null);

export const ChartFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plantsWithAverages);
  const [filters, setFilters] = useState<PlantFilters>({
    searchQuery: '',
    heightRange: [0, 10],
  });

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

    // Height range filter
    if (filters.heightRange) {
      const [min, max] = filters.heightRange;
      result = result.filter(p =>
        p.heightFt.max >= min && p.heightFt.min <= max
      );
    }

    setFilteredPlants(result);
  };

  const value = {
    filters,
    applyFilters,
    setSearchQuery: (searchQuery: string) => setFilters(f => ({ ...f, searchQuery })),
    setFlowerColors: (flowerColors: Color[]) => setFilters(f => ({ ...f, flowerColors })),
    setHeightRange: (heightRange: [number, number]) => setFilters(f => ({ ...f, heightRange })),
    filteredPlants,
  };

  return (
    <ChartFilterContext.Provider value={value}>
      {children}
    </ChartFilterContext.Provider>
  );
};


export const useChartFilter = () => {
  const ctx = useContext(ChartFilterContext);
  if (!ctx) throw new Error('useChartFilter must be used inside a ChartFilterContext.');
  return ctx;
};
