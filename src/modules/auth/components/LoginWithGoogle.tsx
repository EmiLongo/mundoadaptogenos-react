// src/modules/register/components/LoginWithGoogle.tsx
import React from "react"
import { GoogleLoginButton } from "@/shared/components/buttons/GoogleLoginButton"
import { Box } from "@mui/material"
import floatingMushroomWebp from "@img/home/hero/floating_mushroom.webp";
import floatingMushroomPng from "@img/home/hero/floating_mushroom.png";
import shadowMushroomWebp from "@img/home/hero/sombra.webp";
import shadowMushroomPng from "@img/home/hero/sombra.png";

interface ILoginWithGoogle {
  isRecovery?: boolean
}
export const LoginWithGoogle: React.FC<ILoginWithGoogle> = ({isRecovery = false}) => {
  return (
    <>
    <Box sx={{
      display: "flex", 
      alignItems: "center", 
      flexDirection: "column",
      width: {xs: "90%", sm: "550px", md: "383px", lg: "441px", xl: "470px"},
    }}>
      <Box
        component="picture"
        sx={{ width: "206px", transform: {xs: "translateY(0px)", md: isRecovery ? "translateY(-100px)" : "translateY(-30px)"}}}
      >
        <source srcSet={floatingMushroomWebp} type="image/webp" />
        <Box
          component="img"
          src={floatingMushroomPng}
          alt="Hongo Flotando"
          loading="lazy"
          decoding="async"
          width="206px"
        />
      </Box>
      <Box
        component="picture"
        sx={{ width: "206px", transform: {xs: "translateY(0px)", md: isRecovery ? "translateY(-100px)" : "translateY(-30px)"}}}
      >
        <source srcSet={shadowMushroomWebp} type="image/webp" />
        <Box
          component="img"
          src={shadowMushroomPng}
          alt="Sombra del Hongo"
          loading="lazy"
          decoding="async"
          width="206px"
        />
      </Box>
      {!isRecovery &&<GoogleLoginButton />}
    </Box>
    </>
  )
}