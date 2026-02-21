import { createContext, type ReactNode, useContext, useState } from "react";

const ZoomContext = createContext(null);

const BASE_ZOOM_FACTOR = 1;

export const ZoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [zoomFactor, setZoomFactor] = useState(BASE_ZOOM_FACTOR);

  const zoomIn = () => setZoomFactor((z) => Math.min(z * 1.2, 3));
  const zoomOut = () => setZoomFactor((z) => Math.max(z / 1.2, 0.5));
  const zoomReset = () => setZoomFactor(BASE_ZOOM_FACTOR);

  const value = {
    zoomFactor,
    zoomIn,
    zoomOut,
    zoomReset,
  };

  return (
    <ZoomContext.Provider value={value}>
      {children}
    </ZoomContext.Provider>
  );
};


export const useZoom = () => {
  const ctx = useContext(ZoomContext);
  if (!ctx) throw new Error('useZoom must be used inside a Zoom context provider.');
  return ctx;
};
