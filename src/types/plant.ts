export type SoilMoisture = "dry" | "med" | "wet";
export type SunLevel = "full" | "part" | "shade";
export type PlantType = "forb" | "grass" | "sedge" | "shrub" | "tree";
export type Color = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "white";

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
};