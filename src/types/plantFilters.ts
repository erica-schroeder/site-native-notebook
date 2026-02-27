import type { Color, SoilMoisture, SunLevel } from "./plant";

export type Trait = "keystone";

export type PlantFilters = {
  searchQuery?: string;
  flowerColors?: Color[];
  heightRange?: [number, number];
  sunLevels?: SunLevel[];
  soilMoistures?: SoilMoisture[];
  traits?: Trait[];
  caterpillars?: string[];
};
