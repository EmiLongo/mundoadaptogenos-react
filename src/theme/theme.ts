// src/theme.ts
import { createTheme, Theme } from "@mui/material";

// hechas con https://m2.material.io/inline-tools/color/
// el que dice elegido determinó la paleta
export const grayColor = {
  // contraste con texto negro
  50: "#F3DFB4",
  100: "#E8E8E8",
  200: "#D9D9D9",
  300: "#C9C9C9",
  400: "#B5B5B5",
  500: "#9E9E9E",
  // a partir de aca contraste con texto blanco
  600: "#8A8A8A",
  700: "#747474",
  800: "#5C5C5C",
  850: "#494949",
  900: "#323232",
  950: "#080808",
};

export const primaryColor = {
  // contraste con texto negro
  50: "#faeaec",
  100: "#f2c9cd",
  200: "#da9593",
  300: "#c96e6b",
  400: "#cf514a",
  500: "#cf4332",
  600: "#c13b30",
  700: "#b0322b",
  // a partir de aca contraste con texto blanco
  800: "#a32d25",
  900: "#93261c",  // elegido
  950: "#701D15",
};

export const secondaryColor = {
	// contraste con texto negro
	50: "#e6f2ec",
	100: "#c4dfcf",
	200: "#a2cab2",
	300: "#84b597",
	400: "#73a585",
	// a partir de aca contraste con texto blanco
	500: "#689575",
	600: "#60886b",
	700: "#57785e",  // elegido
	800: "#4e6853",
	900: "#3e4c3e",
};

export const accentColor = {
	// contraste con texto negro
  50: "#faf3e1",
  100: "#f3dfb4", // elegido
  200: "#edca80",
  300: "#e8b54a",
  400: "#e4a61c",
  500: "#e29700",
	// a partir de aca contraste con texto blanco
  600: "#df8c00",
  700: "#da7d00",
  800: "#d56e00",
  900: "#cc5600",
};

export const errorColor = {
	// contraste con texto negro
  50: "#ffeaed",
  100: "#ffcace",
  200: "#f19593",
  300: "#e86b69",
  400: "#f14643",
	// a partir de aca contraste con texto blanco
  500: "#f53224",
  600: "#e62525", // elegido
  700: "#d41720",
  800: "#c80a18",
  900: "#b90008",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor[900],
      light: primaryColor[100],
    },
    secondary: {
      main: secondaryColor[700], // Color verde para el texto "Disponibilidad"
    },
    background: {
      default: secondaryColor[700],
      paper: accentColor[100],
    },
    text: {
      primary: primaryColor[950],
      secondary: grayColor[950],
      disabled: grayColor[400],
    },
    error: {
      main: errorColor[600],
    },
  },
  typography: {
    htmlFontSize: 16, // base 1rem = 16px
  },
});


export const customFonts = {
  letter: {
    wide: 1.3,
    normal: 0.3,
  },
  family: {
    oswald: "Oswald, impact, arial, calibri, sans-serif",
    catamaran: "Catamaran, open-sans, arial, calibri, sans-serif",
  },
};

export const defaultParagraph = (theme: Theme) => ({
  fontFamily: customFonts.family.catamaran,
  fontWeight: "normal",
  letterSpacing: customFonts.letter.normal,
  color: theme.palette.text.secondary,
});

export const defaultCTA = (theme: Theme) => ({
  fontFamily: customFonts.family.catamaran,
  fontWeight: "normal",
  letterSpacing: customFonts.letter.wide,
  color: theme.palette.text.secondary,
});

export const defaultTitle = (theme: Theme) => ({
  fontFamily: customFonts.family.oswald,
  letterSpacing: customFonts.letter.normal,
  fontWeight: 600,
  color: theme.palette.text.secondary,
});

export const inputAdvice = (theme: Theme) => ({
  fontFamily: customFonts.family.catamaran,
  fontSize: "0.75rem", // 12px
  color: theme.palette.background.paper,
});