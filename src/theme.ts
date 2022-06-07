import { createTheme } from '@mui/material/styles';
import { red, deepOrange, grey } from '@mui/material/colors';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Comfortaa',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        htmlFontSize: 14,
    },
    palette: {
        primary: deepOrange,
        secondary: grey,
        rblack: {
            main: '#333',
            contrastText: '#fff',
        },
        error: {
            main: red.A400,
        },
    },
});

declare module '@mui/material/styles' {
    interface Palette {
        rblack: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        rblack?: PaletteOptions['primary'];
    }

    interface PaletteColor {
        rblack?: string;
    }

    interface SimplePaletteColorOptions {
        rblack?: string;
    }
}

export default theme;

