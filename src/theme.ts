import { createTheme } from '@mui/material/styles';
import { red, deepOrange, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: deepOrange,
    secondary: grey,
    error: {
      main: red.A400,
    },
  },
});

export default theme;
