// src/shared/components/user/Profile.tsx
import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { HeadingPage } from "../../../shared/components/HeadingPage";
import { Heading3, Heading4 } from "@theme/textStyles";
import { paddingPage } from "@theme/theme";
import { ProfileForm } from "../components/ProfileForm";



export const Profile: React.FC = () => {

  const theme = useTheme();
  const isMoble = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{

      // paddingRight: {xs: "1rem", sm:"2rem", md:"4rem", lg:"5rem", xl:"8rem"},
      // paddingLeft: {xs: "1rem", sm:"2rem", xl:"3rem"},
      paddingTop: {xs: "24px", md:"48px"},
      paddingBottom: {xs: "3rem", md:"3rem"},
      ...paddingPage
    }}>
      <HeadingPage text="Página para gestión de los datos del usuario" />
      {isMoble 
        ? <Heading4 sx={{textAlign: "center", marginBottom: "16px"}}>CONFIGURACIÓN DE CUENTA</Heading4>
        : <Heading3 sx={{textAlign: "center", marginBottom: "16px"}}>CONFIGURACIÓN DE CUENTA</Heading3>
      }
      <ProfileForm />
    </Box>
  )
}