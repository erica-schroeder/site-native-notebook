import type { Plant } from "@/types/plant";

export const grasses: Plant[] = [{
        id: "schizachyrium-scoparium",
        scientificName: "Schizachyrium scoparium",
        commonName: "Little Bluestem",
        plantType: "grass",
        sun: ["full"],
        soilMoisture: ["dry", "med"],
        heightFt: {min: 3, max: 3},
        widthFt: {min: 2, max: 3},
        bloomMonths: ["jul", "aug", "sep", "oct"],
        illustration: {
             svg: "schizachyrium-scoparium.svg",
             heightFt: 3,
             widthFt: 2.5,
        },
}];