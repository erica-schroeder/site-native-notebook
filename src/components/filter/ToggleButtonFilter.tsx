import {
    ToggleButton,
    ToggleButtonGroup,
    Tooltip
} from '@mui/material';

const sizeConfig = {
    xs: {
        toggleButtonSize: "small",
    },
    md: {
    },
    lg: {
    }
};

export function ToggleButtonFilter({ options, size, ...props }) {
    const config = sizeConfig[size ?? "lg"];
    return (
        <ToggleButtonGroup
            size={config?.toggleButtonSize}
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
