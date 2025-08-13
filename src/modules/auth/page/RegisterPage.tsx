// src/modules/register/page/RegisterPage.tsx
import React from "react";
import { Box, useMediaQuery } from "@mui/material"
import { RegisterForm } from "../components/RegisterForm";
import bgReg from "@img/home/hero/fondo.webp"
import { paddingPage } from "@theme/theme";
import { LoginWithGoogle } from "../components/LoginWithGoogle";
import { useTheme } from "@mui/material";

export const RegisterPage: React.FC = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{
      display: "flex", 
      justifyContent: "center",
      backgroundImage: `url(${bgReg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: {xs: "80vh", md:"70vh"},
      width: "100%",
      gap: {md: "16px", xl: "32px"},
      ...paddingPage
    }}>
      {!isMobile && 
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <LoginWithGoogle />
        </Box>
      }
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <RegisterForm />
      </Box>
    </Box>
  )
}