import React, { useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  baseWidth: number; // width of chart at zoom = 1
  baseHeight: number; // height of chart at zoom = 1
  minZoom?: number;
  maxZoom?: number;
};

export function ScrollWrapper({
  children,
  baseWidth,
  baseHeight,
  minZoom = 0.5,
  maxZoom = 3,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const startX = useRef(0);
  const startY = useRef(0);
  const startScrollX = useRef(0);
  const startScrollY = useRef(0);

  const [zoom, setZoom] = useState(1);

  // --- Ctrl + right-drag pan ---
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button === 2 && e.ctrlKey) {
      e.preventDefault();

      startX.current = e.clientX;
      startY.current = e.clientY;
      startScrollX.current = window.scrollX;
      startScrollY.current = window.scrollY;

      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    window.scrollTo({
      left: startScrollX.current - dx,
      top: startScrollY.current - dy,
    });
  };

  const onPointerUp = () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);

    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
      onPointerDown={onPointerDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        style={{
          width: baseWidth * zoom,
          height: baseHeight * zoom,
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
}
