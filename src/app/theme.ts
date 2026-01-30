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
    background: {
        default: '#f8f8f8',
        paper: '#f8f8f8',
    },
    appBar: {
        main: '#f8f8f8',
        contrastText: '#3a2a16',
    },
    heading: {
        main: '#3a2a16',
    }
};

let theme = createTheme({
    palette: palette,
    typography: {
            fontFamily: 'Open Sans',
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: palette.appBar.main,
                    color: palette.appBar.contrastText
                },
            },
        },
    },
});

theme = createTheme(baseTheme, theme);
theme = responsiveFontSizes(theme);

export { theme };