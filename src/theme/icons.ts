export type IconConfig = {
  src: string
  opticalScale?: number
};

export const iconMap = {
    sun: {
        full: {
            src: "icons/full-sun-icon.svg",
            chartScale: 1.4,
            uiScale: 1.2,
        },
        part: {
            src: "icons/part-sun-icon.svg",
            chartScale: 1.3,
            uiScale: 1.2,
        },
        shade: {
            src: "icons/shade-sun-icon.svg",
            chartScale: 1.3,
            uiScale: 1.2,
        },
    },
    soil: {
        wet: { src: "icons/wet-soil-icon.svg" },
        med: { src: "icons/med-soil-icon.svg" },
        dry: { src: "icons/dry-soil-icon.svg" },
    },
    flowerColor: {
        red: {
            src: "icons/flower-red-icon.svg",
            uiScale: 1.2,
        },
        orange: {
            src: "icons/flower-orange-icon.svg",
            uiScale: 1.2,
        },
        yellow: {
            src: "icons/flower-yellow-icon.svg",
            uiScale: 1.2,
        },
        green: {
            src: "icons/flower-green-icon.svg",
            uiScale: 1.2,
        },
        blue: {
            src: "icons/flower-blue-icon.svg",
            uiScale: 1.2,
        },
        purple: {
            src: "icons/flower-purple-icon.svg",
            uiScale: 1.2,
        },
        pink: {
            src: "icons/flower-pink-icon.svg",
            uiScale: 1.2,
        },
        white: {
            src: "icons/flower-white-icon.svg",
            uiScale: 1.2,
        },
    },
    traits: {
        keystone: {
            src: "icons/keystone-icon.svg",
            chartScale: 1.0,
            uiScale: 1.1,
        },
    }
};