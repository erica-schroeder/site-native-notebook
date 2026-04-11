import type { Plant } from "@/types/plant";
import { forbs as forbsaf } from "./forbs-a-f";
import { forbs as forbsgm } from "./forbs-g-m";
import { forbs as forbsnz } from "./forbs-n-z";
import { grasses } from "./grasses";
import { sedges } from "./sedges";

export const plants: Plant[] = [
    ...forbsaf,
    ...forbsgm,
    ...forbsnz,
    ...grasses,
    ...sedges,
];

export const plantsWithAverages = plants.map(p => ({
    ...p,
    avgHeight: (p.heightFt.min + p.heightFt.max) / 2,
    avgWidth: (p.widthFt.min + p.widthFt.max) / 2,
}));