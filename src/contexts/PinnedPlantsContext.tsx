import { createContext, type ReactNode, useCallback, useContext, useState } from "react";

const PARAM_KEY = "pins";

const PinnedPlantsContext = createContext(null);

export const PinnedPlantsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getPinnedFromUrl = () => {
    const hash = window.location.hash;
    const queryString = hash.includes("?") ? hash.slice(hash.indexOf("?")) : "";
    const params = new URLSearchParams(queryString);
    const raw = params.get(PARAM_KEY);
    return raw ? raw.split(",").filter(Boolean) : [];
  }

  const [pinnedIds, setPinnedIds] = useState(() => getPinnedFromUrl());

  const syncUrlWithPins = (ids) => {
    const hash = window.location.hash;
    const [route] = hash.split("?");

    const newHash = ids.length > 0
      ? `${route}?${PARAM_KEY}=${ids.join(",")}`
      : route;

    window.history.replaceState(null, "", `#${newHash.replace(/^#/, "")}`);
  }

  const togglePin = useCallback((id) => {
    setPinnedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id];
      syncUrlWithPins(next);
      return next;
    });
  }, []);

  const clearPins = useCallback(() => {
    setPinnedIds([]);
    syncUrlWithPins([]);
  }, []);

  const value = {
    pinnedIds,
    togglePin,
    clearPins,
  };

  return (
    <PinnedPlantsContext.Provider value={value}>
      {children}
    </PinnedPlantsContext.Provider>
  );
};

export const usePinnedPlants = () => {
  const ctx = useContext(PinnedPlantsContext);
  return ctx;
};
