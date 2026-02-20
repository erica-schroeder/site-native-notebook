import { baseTheme } from '@erica/mui-web';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        appBar: {
            main: string;
            contrastText: string;
        };
    }
    interface PaletteOptions {
        appBar?: {
            main?: string;
            contrastText?: string;
        };
    }
}

const palette = {
    primary: {
        main: '#6750A4',
        contrastText: '#FFFFFF',
    },
    text: {
        primary: '#333333',   // dark gray
        secondary: '#555555', // medium gray
    },
    background: {
        default: '#FAF9F6',
        paper: '#FAF9F6',
    },
    appBar: {
        main: '#ECECE4',
        contrastText: '#3a2a16',
    },
};

let theme = createTheme({
    palette: palette,
    typography: {
        fontFamily: 'Inter',
        h1: { fontFamily: 'Domine, serif', fontWeight: 700 },
        h2: { fontFamily: 'Domine, serif', fontWeight: 700 },
        h3: { fontFamily: 'Domine, serif', fontWeight: 700 },
        h4: { fontFamily: 'Domine, serif', fontWeight: 700 },
        h5: { fontFamily: 'Domine, serif', fontWeight: 700 },
        h6: { fontFamily: 'Domine, serif', fontWeight: 700 },
        navItemPrimary: {
            color: palette.appBar.contrastText,
            fontFamily: 'Domine',
            fontSize: '1rem',
            fontWeight: 700,
        },
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: palette.appBar.main,
                    color: palette.appBar.contrastText,
                    boxShadow: "none",
                },
            },
        },
    },
});

theme = createTheme(baseTheme, theme);
theme = responsiveFontSizes(theme);

export { theme };