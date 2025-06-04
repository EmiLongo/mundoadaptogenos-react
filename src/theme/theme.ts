// src/theme.ts
import { createTheme, Theme } from "@mui/material";

// hechas con https://m2.material.io/inline-tools/color/
// el que dice elegido determinó la paleta
export const greyColor = {
  // contraste con texto negro  
  50: "#F9F9F9",
  100: "#F3F3F3",
  200: "#EBEBEB",
  300: "#DBDBDB",
  400: "#B8B8B8",
  // a partir de aca contraste con texto blanco
  500: "#989898",
  600: "#707070",
  700: "#5C5C5C",
  800: "#3D3D3D",
  900: "#1D1D1D",
  950: "#080808",
};

export const primaryColor = {
  // 50: "#f3f6fc",
  100: "#DEE4F2",
  200: "#C2D5FF",
  // 300: "#93b9e6",
  400: "#6695FF",
  // hasta aca contraste con texto negro
  // 500: "#3478c3",
  // a partir de aca contraste con texto blanco
  600: "#0033A5",
  // 700: "#1e4b86",
  800: "#051242",
  900: "#09041B",
  // 950: "#13243e",
  // elegido
};

export const secondaryColor = {
	// contraste con texto negro
	// 50: "#e6f2ec",
	// 100: "#c4dfcf",
	// 200: "#a2cab2",
	// 300: "#84b597",
	400: "#FD7F16",
	// a partir de aca contraste con texto blanco
	// 500: "#689575",
	600: "#8E4101",
	// 700: "#57785e",
	// 800: "#4e6853",
	// 900: "#3e4c3e",
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
  50: "#FEF2F3",
  100: "#FDE3E4",
  200: "#FDCBCE",
  300: "#FAA7AB",
  400: "#F57F85",
	// a partir de aca contraste con texto blanco
  500: "#EB4850",
  600: "#D72B34", // elegido
  700: "#A91E25",
  800: "#961E24",
  900: "#961E24",
  950: "#430C0F",
  // 50: "#FFE2EB",
  // 100: "#FFB7CD",
  // 200: "#FF86AB",
	// // contraste con texto negro
  // 300: "#FF4E89",
  // 400: "#FF006F",
  // 500: "#FD0054",
  // 600: "#EC0053",
  // 700: "#D70050",
  // 800: "#C3004E",
  // // a partir de aca contraste con texto blanco
  // 900: "#9D004B",
  // 950: "#700036",
};

export const customFonts = {
  letter: {
    wide: 1.3,
    normal: 0.3,
  },
  family: {
    alata: "Alata, impact, arial, calibri, sans-serif",
    hindMadurai: "Hind Madurai, open-sans, arial, calibri, sans-serif",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor[900],
      light: primaryColor[200],
      ...primaryColor,
    },
    secondary: {
      main: secondaryColor[400], // Color naranja
      dark: secondaryColor[600],
      ...secondaryColor,
    },
    background: {
      // default: "#18222986",
      paper: greyColor[50],
    },
    text: {
      primary: primaryColor[800],
      secondary: greyColor[950],
      disabled: greyColor[400],
    },
    error: {
      main: errorColor[800],
      light: errorColor[400],
      ...errorColor,
    },
    grey: {
      ...greyColor,
    },
  },
  typography: {
    htmlFontSize: 16, // base 1rem = 16px
  },
  components: {
    MuiButton: {
      defaultProps: {
        // Establece el estilo predeterminado del botón
        variant: "contained",
        size: "small",
      },
      styleOverrides: {
        // sobreescribe estilos de botones
        root: {
          minHeight: '30px',
          borderRadius: '4px',
          letterSpacing: customFonts.letter.wide,
          width: "fit-content",
          fontFamily: customFonts.family.hindMadurai,
          fontWeight: 500,
          textTransform: "uppercase",
        },
      },
    },
        MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: customFonts.family.hindMadurai,
          color: greyColor[950],
          borderRadius: "4px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: greyColor[600],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: greyColor[700],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryColor[600],
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: errorColor[700],
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: customFonts.family.hindMadurai,
          color: greyColor[800],
          "&.Mui-focused": {
            color: primaryColor[600],
          },
          "&.Mui-error": {
            color: errorColor[700],
          },
        },
      },
    },
  }
});



export const defaultParagraph = (theme: Theme) => ({
  fontFamily: customFonts.family.hindMadurai,
  fontWeight: "normal",
  letterSpacing: customFonts.letter.normal,
  color: theme.palette.text.primary,
  lineHeight: 1.3,
});

export const defaultCTA = (theme: Theme) => ({
  fontFamily: customFonts.family.hindMadurai,
  fontWeight: "normal",
  letterSpacing: customFonts.letter.wide,
  color: theme.palette.text.primary,
});

export const defaultTitle = (theme: Theme) => ({
  fontFamily: customFonts.family.alata,
  letterSpacing: customFonts.letter.normal,
  fontWeight: 500,
  color: theme.palette.text.primary,
  // lineHeight: 1.2,
});

export const inputAdvice = (theme: Theme) => ({
  fontFamily: customFonts.family.hindMadurai,
  fontSize: "0.75rem", // 12px
  color: theme.palette.background.paper,
});