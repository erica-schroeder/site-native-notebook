import {
    ToggleButton,
    ToggleButtonGroup,
    Tooltip
} from '@mui/material';

export function ToggleButtonFilter({ options, ...props }) {
    return (
        <ToggleButtonGroup
            {...props}
        >
            {options.map(o =>
                <Tooltip title={o.tooltip} arrow>
                    <ToggleButton value={o.value}>
                        <img src={o.icon.src} width={30} height={20} style={{ transform: `scale(${o.icon.uiScale ?? 1})`, display: "block" }} />
                    </ToggleButton>
                </Tooltip>
            )}
        </ToggleButtonGroup>
    );
};
