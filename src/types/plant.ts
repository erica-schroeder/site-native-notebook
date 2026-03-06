export type SoilMoisture = "dry" | "med" | "wet";
export type SunLevel = "full" | "part" | "shade";
export type PlantType = "forb" | "grass" | "sedge" | "shrub" | "tree";
export type Color = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "white";
export const BLOOM_MONTHS = ["apr", "may", "jun", "jul", "aug", "sep", "oct", "nov"] as const;
export type BloomMonth = typeof BLOOM_MONTHS[number];

export type Traits = {
    keystone?: boolean;
}

export type Plant = {
    id: string;
    commonName: string;
    scientificName: string;
    plantType: PlantType;
    sun: SunLevel[];
    soilMoisture: SoilMoisture[];
    flowerColor?: Color[];
    heightFt: {
        min: number;
        max: number;
    };
    widthFt: {
        min: number;
        max: number;
    };
    illustration?: {
        svg: string;
        heightFt: number;
        widthFt: number;
    };
    traits?: Traits;
    hostCaterpillars?: string[];
    notes?: string;
    otherNames?: string[];
    bloomMonths: BloomMonth[];
};