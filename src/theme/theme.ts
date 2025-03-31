import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#AE82C2', // Color púrpura de los círculos del diseño original
    },
    secondary: {
      main: '#4CAF50', // Color verde para el texto "Disponibilidad"
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'Noto Sans',
      'Homenaje',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Homenaje, sans-serif',
    },
    h2: {
      fontFamily: 'Homenaje, sans-serif',
    },
  },
});