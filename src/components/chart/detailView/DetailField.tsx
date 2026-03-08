import { Stack, Typography } from "@mui/material";

export const DetailField = ({ label, children }) => (
    <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="fieldLabel" sx={{ width: { xs: 120, md: 160 }, flexShrink: 0 }}>
            {label}
        </Typography>
        {children}
    </Stack>
);