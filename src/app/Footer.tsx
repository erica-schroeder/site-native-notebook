import { Divider, Stack, Typography } from "@mui/material";

export const Footer: React.FC = () => {
    return (
        <Stack
        spacing={2}
        sx={{
            alignItems: "center",
            py: 3
        }}
        >
            <Divider sx={{ width: '100%' }} />

            <Typography variant="subtitle2" sx={{ color: 'grey' }}>
                © {new Date().getFullYear()} nativenotebook.org — All rights reserved
            </Typography>
        </Stack>
    );
};