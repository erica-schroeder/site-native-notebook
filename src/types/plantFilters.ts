import type { Color } from "./plant";

export type PlantFilters = {
  searchQuery?: string;
  flowerColors?: Color[];
  heightRange?: [number, number];
};
