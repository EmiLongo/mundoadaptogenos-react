// src/modules/register/page/RecoveryPass.tsx
import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material"
import bgReg from "@img/home/hero/fondo.webp"
import { paddingPage } from "@theme/theme";
import { LoginWithGoogle } from "../components/LoginWithGoogle";
import { useTheme } from "@mui/material";
import { RecoveryForm } from "../components/RecoveryForm";
import { supabase } from "@/api/apiClient";
import Loading from "@/shared/components/Loading";
import { Heading3 } from "@/theme/textStyles";

export const RecoveryPass: React.FC = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [authEvent, setAuthEvent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event == "PASSWORD_RECOVERY") {
        setAuthEvent(true);
      }
    })
    } catch (error) {
    console.log(error);
    } finally {
    setLoading(false);
    }
  }, [])

  if(loading) return <Loading />

  return (
    <Box sx={{
      display: "flex", 
      justifyContent: "center",
      flexDirection: !authEvent ? "column-reverse" : "row",
      backgroundImage: `url(${bgReg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: {xs: "80vh", md:"70vh"},
      width: "100%",
      gap: {md: "16px", xl: "32px"},
      ...paddingPage
    }}>
      {(!isMobile || !authEvent) && 
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <LoginWithGoogle isRecovery={true} />
        </Box>
      }
      {!authEvent 
        ? <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            transform: {xs: "translateY(-30px)", md: "translateY(-100px)" },
            ...paddingPage
          }}>
            <Heading3 sx={{ lineHeight:1, textAlign: "center" }}>No tienes los permisos necesarios para esta página</Heading3>
          </Box>
        : <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <RecoveryForm />
          </Box>
      }
    </Box>
  )
}