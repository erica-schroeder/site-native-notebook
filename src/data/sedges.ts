import type { Plant } from "@/types/plant";

export const sedges: Plant[] = [{
        id: "carex-grayi",
        scientificName: "Carex grayi",
        commonName: "Gray's Sedge",
        plantType: "sedge",
        sun: ["full", "part"],
        soilMoisture: ["wet", "med"],
        heightFt: {min: 3, max: 3},
        widthFt: {min: 1, max: 2},
        bloomMonths: ["may", "jun", "jul", "aug"],
        illustration: {
             svg: "carex-grayi.svg",
             heightFt: 3,
             widthFt: 1.5,
        },
        notes: "The spiky balls on this plant are so cool and provide visual interest for months! (apparently the technical term for \"spiky balls\" here is perigynia)",
}];