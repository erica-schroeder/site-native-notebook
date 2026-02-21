import { PlantDetailView } from "@/components/chart/PlantDetailView";
import type { Plant } from "@/types/plant";
import { createContext, type ReactNode, useContext, useState } from "react";

const PlantDetailDisplayContext = createContext(null);

export const PlantDetailDisplayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePlant, setActivePlant] = useState<Plant | null>(null);

  const value = {
    setActivePlant
  };

  return (
    <PlantDetailDisplayContext.Provider value={value}>
      {children}
      <PlantDetailView
        plant={activePlant}
        open={activePlant !== null}
        onClose={() => setActivePlant(null)}
      />
    </PlantDetailDisplayContext.Provider>
  );
};


export const usePlantDetailDisplay = () => {
  const ctx = useContext(PlantDetailDisplayContext);
  if (!ctx) throw new Error('usePlantDetailDisplay must be used inside a PlantDetailDisplayContext provider.');
  return ctx;
};
