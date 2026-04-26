import { PlantChartMui } from "@/components/chart/PlantChartMui";
import { usePinnedPlants } from "@/contexts/PinnedPlantsContext";
import { plantsWithAverages } from "@/data/plants";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import PushPinIcon from "@mui/icons-material/PushPin";
import {
    Collapse,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import { useCallback, useRef, useState } from "react";

const MIN_HEIGHT_PX = 120;
const MAX_HEIGHT_VH = 85;
const DEFAULT_HEIGHT_PX = window.innerHeight * 0.45;
 
export const PinnedPlantShelf = () => {
    const { pinnedIds, clearPins } = usePinnedPlants();
    const [expanded, setExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(DEFAULT_HEIGHT_PX);
    const dragStartY = useRef<number | null>(null);
    const dragStartHeight = useRef<number>(DEFAULT_HEIGHT_PX);
    const didDrag = useRef(false);
    const theme = useTheme();
 
    const pinnedPlants = plantsWithAverages.filter((p) =>
        pinnedIds.includes(p.id)
    );
    const count = pinnedPlants.length;
 
    const onDragStart = useCallback((e: React.PointerEvent) => {
        e.preventDefault();
        dragStartY.current = e.clientY;
        dragStartHeight.current = contentHeight;
        didDrag.current = false;
 
        const onMove = (moveEvent: PointerEvent) => {
            didDrag.current = true;
            const delta = dragStartY.current! - moveEvent.clientY;
            const maxPx = window.innerHeight * (MAX_HEIGHT_VH / 100);
            const next = Math.min(maxPx, Math.max(MIN_HEIGHT_PX, dragStartHeight.current + delta));
            setContentHeight(next);
        };
 
        const onUp = () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            // reset after click event has fired so it can be suppressed
            setTimeout(() => { didDrag.current = false; }, 0);
        };
 
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
    }, [contentHeight]);
 
    const handleRowClick = useCallback(() => {
        if (didDrag.current) return;
        setExpanded((v) => !v);
    }, []);
 
    if (count === 0 && !expanded) return null;
 
    const sharedBg = {
        bgcolor: theme.palette.mode === "dark"
            ? "rgba(18, 28, 18, 0.97)"
            : "rgba(243, 248, 243, 0.97)",
        backdropFilter: "blur(8px)",
    };
 
    const countBadge = (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                bgcolor: count > 0 ? "primary.main" : "grey.400",
                color: "primary.contrastText",
                borderRadius: "50%",
                width: 20,
                height: 20,
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
            }}
        >
            {count}
        </Stack>
    );
 
    return (
        <Stack
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: theme.zIndex.drawer,
                ...sharedBg,
                boxShadow: "0 -4px 24px rgba(0,0,0,0.18)",
                border: `1.5px solid ${theme.palette.primary.main}`,
                borderBottom: "none",
                borderRadius: "14px 14px 0 0",
            }}
        >
            {/* Handle row — click anywhere except pip/actions to toggle */}
            <Stack
                direction="row"
                alignItems="center"
                onClick={handleRowClick}
                sx={{
                    cursor: "pointer",
                    userSelect: "none",
                    borderBottom: expanded ? `1px solid ${theme.palette.divider}` : "none",
                    borderRadius: expanded ? 0 : "14px 14px 0 0",
                }}
            >
                {/* Left: label */}
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    sx={{
                        py: 1.25,
                        px: 2,
                        flex: 1,
                    }}
                >
                    <PushPinIcon fontSize="small" color="primary" />
                    <Typography variant="subtitle2" fontWeight={700}>
                        Pinned
                    </Typography>
                    {countBadge}
                </Stack>
 
                {/* Center: drag pip — stops propagation so it doesn't toggle */}
                {expanded && (
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={onDragStart}
                        sx={{
                            px: 3,
                            alignSelf: "stretch",
                            cursor: "ns-resize",
                            userSelect: "none",
                            "&:hover .drag-pip": {
                                bgcolor: theme.palette.primary.main,
                            },
                        }}
                    >
                        <Stack
                            className="drag-pip"
                            sx={{
                                width: 32,
                                height: 4,
                                borderRadius: 2,
                                bgcolor: theme.palette.divider,
                                transition: "background-color 0.15s ease",
                            }}
                        />
                    </Stack>
                )}
 
                {/* Right: actions */}
                {expanded && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        gap={0.5}
                        px={1}
                        sx={{ flex: 1 }}
                    >
                        {count > 0 && (
                            <Tooltip title="Clear all pins">
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearPins();
                                        setExpanded(false);
                                    }}
                                >
                                    <ClearAllIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="Close">
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpanded(false);
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )}
            </Stack>
 
            {/* Expanded content */}
            <Collapse in={expanded} unmountOnExit>
                <Stack
                    sx={{
                        height: contentHeight,
                        overflowY: "auto",
                        overflowX: "auto",
                    }}
                >
                    {count === 0 ? (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textAlign: "center", py: 3 }}
                        >
                            No plants pinned yet.
                        </Typography>
                    ) : (
                        <PlantChartMui plants={pinnedPlants} />
                    )}
                </Stack>
            </Collapse>
        </Stack>
    );
};