import Logo from '@/assets/logo.svg';
import { Box } from "@mui/material";
import type React from "react";
import { useNavigate } from "react-router";

export const ClickableLogo: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Box
            component="img"
            src={Logo}
            alt="Logo"
            onClick={() => navigate("/")}
            sx={{
                maxHeight: {xs: 80, md: 100},
                maxWidth: "100%",
                cursor: 'pointer',
            }}
        />
    );
};