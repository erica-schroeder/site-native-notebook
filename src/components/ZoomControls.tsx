import { useZoom } from "@/contexts/ZoomContext";
import ReplayIcon from '@mui/icons-material/Replay';
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { IconButton, Stack, Tooltip } from "@mui/material";

const ZoomButton = ({ tooltip, ...props }) =>
    <Tooltip title={tooltip} placement="right" arrow>
        <IconButton color="primary" size="small" {...props} />
    </Tooltip>;

export const ZoomControls = ({ ...props }) => {
    const { zoomIn, zoomOut, zoomReset } = useZoom();

    return (
        <Stack direction="column" spacing={1} justifyContent="center" alignItems="center" {...props}>
            <ZoomButton tooltip="Zoom In" onClick={zoomIn}>
                <ZoomInIcon />
            </ZoomButton>

            <ZoomButton tooltip="Zoom Out" onClick={zoomOut}>
                <ZoomOutIcon />
            </ZoomButton>

            <ZoomButton tooltip="Reset Zoom" onClick={zoomReset}>
                <ReplayIcon />
            </ZoomButton>
        </Stack>
    );
};