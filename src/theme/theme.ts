// src/theme.ts
import { createTheme } from "@mui/material";
import { defaultFonts } from "./textStyles";

// hechas con https://m2.material.io/inline-tools/color/
// el que dice elegido determinó la paleta
export const greyColor = {
  50: "#FAFAF9",
  100: "#F0F0EE",
  200: "#DFDFD8",
  300: "#C2C1B7",
  // hasta acá contraste con texto negro  
  400: "#A1A08F",
  500: "#858372",
  600: "#6D6C5C",
  700: "#59584B",
  // a partir de aca contraste con texto blanco
  800: "#4C4B40",
  900: "#414139",
  950: "#2B2B26",
};

export const redColor = {   // Mexican Red: errorColor
  50: "#FEF2F3",
  100: "#FDE3E4",
  200: "#FDCBCE",
  300: "#FAA7AB",
  400: "#F57F85",
  // hasta aca contraste con texto negro
  500: "#EB4850",
  600: "#D72B34",
	// a partir de aca contraste con texto blanco
  700: "#A91E25",
  800: "#961E24",
  900: "#961E24",
  950: "#430C0F",
};

export const brownColor = {  // Desert Brown: primaryColor
  50: "#FCEED8",
  100: "#F6D4A6",
  200: "#EFC07B",
  // hasta aca contraste con texto negro
  300: "#E6A14A",
  400: "#DD872C",
  500: "#C86C22",
  600: "#B05E27",
  700: "#904A1D",
  // a partir de aca contraste con texto blanco
  800: "#693E29",
  900: "#43271A",
  950: "#291711",
};

export const greenColor = {   // Lime Green: secondaryColor
  50: "#F6FFE4",
	100: "#EAFFC5",
	200: "#D4FF92",
	300: "#B6FF53",
	400: "#97FB20",
	500: "#84FA00",
	// hasta aca contraste con texto negro
	600: "#5AB500",
	700: "#458902",
	800: "#386C08",
	// a partir de aca contraste con texto blanco
	900: "#315B0C",
  950: "#163300"
};

//son todas iguales por el momento
export const shadow = {
  small: {boxShadow: `
  0px 1px 3px 0px rgba(0, 0, 0, 0.12),
  0px 1px 1px 0px rgba(0, 0, 0, 0.14),
  0px 2px 1px -1px rgba(0, 0, 0, 0.20)
  `,},
  medium: {boxShadow: `
    0px 1px 3px 0px rgba(0, 0, 0, 0.12),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.20)
    `,},
  large:{boxShadow: `
    0px 1px 3px 0px rgba(0, 0, 0, 0.12),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.20)
    `,},
}
export const paddingPage = { paddingX:{xs: "1rem", sm:"2rem", md:"4rem", lg:"5rem", xl:"8rem"}, }

export const theme = createTheme({
  palette: {
    primary: {
      main: brownColor[600],
      dark: brownColor[950],
      light: brownColor[200],
      ...brownColor,
    },
    secondary: {
      main: greenColor[500], 
      dark: greenColor[900],
      light: greenColor[200],
      ...greenColor,
    },
    background: {
      default: greyColor[50],
      paper: greyColor[50],
    },
    text: {
      primary: brownColor[800],
      secondary: greyColor[950],
      disabled: greyColor[400],
    },
    error: {
      main: redColor[400],
      dark: redColor[800],
      light: redColor[200],
      ...redColor,
    },
    grey: {
      ...greyColor,
    },
  },
  typography: {
    htmlFontSize: 16, // base 1rem = 16px
    fontFamily: defaultFonts.family.textos,
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
          letterSpacing: defaultFonts.letter.wide,
          width: "fit-content",
          fontFamily: defaultFonts.family.textos,
          fontWeight: 500,
          textTransform: "uppercase",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          height: "40px",
          width: "40px",
          border: `1px solid ${brownColor[950]}`,
          borderRadius: "30px",
          color: brownColor[950],
          "&:hover": {
            backgroundColor: greyColor[300],
            color: "primary.main",
          },
        },
      },
      variants: [
        {
          props: { color: "secondary" },
          style: {
            border: "none",
            color: "primary.dark",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              color: "secondary.dark",
            },
          },
        },
      ],
    },
     
    MuiTextField: {
      defaultProps: {
        // variant: "filled",
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: defaultFonts.family.textos,
          color: greyColor[950],
          height: "40px",
          borderRadius: "40px",
          // Estado por defecto (enabled)
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: greyColor[800],
          },
          "& .MuiSelect-select": {
            color: greyColor[800],
          },
          // Hover
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: greyColor[950],
          },
          // Focused
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: greenColor[900],
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: redColor[700],
          },
          // Disabled
          "&.Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: greyColor[600],
            },
            "& .MuiSelect-select": {
              color: greyColor[600],
            },
          },
          // Error
          "&.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: redColor[700],
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: defaultFonts.family.textos,
          transform: "translate(14px, 9px) scale(1)",
          color: greyColor[800],
          "&.Mui-focused": {
            transform: "translate(16px, -9px) scale(0.7)",
            color: brownColor[600],
          },
          "&.Mui-error": {
            color: redColor[700],
          },
          "&.MuiFormLabel-filled": {
            transform: "translate(16px, -9px) scale(0.7)",
            color: brownColor[600],
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            color: redColor[700],
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          // Texto por defecto
          color: greyColor[800],
        },
        icon: {
          color: greyColor[800],
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: greyColor[800], // texto en el desplegable
          "&.Mui-selected": {
            color: greyColor[800],
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: greyColor[950],
            },
          },
        },
      },
    },
  }
});