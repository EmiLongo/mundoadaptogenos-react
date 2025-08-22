// src/modules/404/page/Error404.tsx
import { Box, useMediaQuery, useTheme } from "@mui/material"
import React from "react"
import { HeadingPage } from "@shared/components/HeadingPage"
import { BodyL, BodyM, BodyS, Heading3, Heading4 } from "@theme/textStyles"
import webp404 from "@img/404/404.webp"
import png404 from "@img/404/404.png"
import bg404 from "@img/404/fondo-404.webp"

export const Error404: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      height: {xs: "80vh", md:"75vh"},
      width: "100%",
      backgroundImage: `url(${bg404})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding:{xs: "2rem", md:"64px", lg:"80px 128px", xl:"80px 200px"}, 
    }}>
      <HeadingPage text="Página no encontrada" />
      <Box sx={{
        backgroundColor: "rgba(250, 250, 249, 0.6)",
        paddingY: "24px",
        paddingX: {xs: "32px", sm: "48px", md: "unset"},
        borderRadius: "8px",
        width: "100%",
        maxHeight: {xs: "350px", sm: "450px" ,md: "475px", lg: "620px", xl: "670px"},
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: {xs: "16px", md: "24px"},
      }}>
        {/* Titulo */}
        {isMobile
          ? <Box><Heading4 sx={{textAlign: "center", marginBottom: "16px"}}>Error 404</Heading4>
              <Heading4 sx={{textAlign: "center", marginBottom: "16px"}}>¡Página no encontrada!</Heading4></Box>
          : <Box><Heading3 sx={{textAlign: "center", marginBottom: "16px"}}>Error 404</Heading3>
              <Heading3 sx={{textAlign: "center", marginBottom: "16px"}}>¡Página no encontrada!</Heading3></Box>
        }
        {/* Imagen */}
        <Box
          component="picture"
            sx={{height: {xs: "160px", sm: "210px", md: "240px", lg: "200px", xl: "300px"}}}
        >
          <source srcSet={webp404} type="image/webp" />
          <Box
            component="img"
            src={png404}
            alt="Hongo Flotando"
            loading="lazy"
            decoding="async"
            sx={{height: {xs: "120px", sm: "210px", md: "240px", lg: "200px", xl: "300px"}}}
          />
        </Box>

        {/* pie de pagina */}
        {isMobile
          ? <Box><BodyS sx={{textAlign: "center", textWrap: "balance"}}>Lo sentimos, no pudimos encontrar la página que buscás. Asegurate de revisar la ortografía en la URL.</BodyS></Box>
          : isLargeScreen
            ? <Box><BodyL sx={{textAlign: "center", textWrap: "balance"}}>Lo sentimos, no pudimos encontrar la página que buscás.</BodyL>
             <BodyL sx={{textAlign: "center", textWrap: "balance"}}>Asegurate de revisar la ortografía en la URL.</BodyL></Box>
            : <Box><BodyM sx={{textAlign: "center", textWrap: "balance"}}>Lo sentimos, no pudimos encontrar la página que buscás.</BodyM>
             <BodyM sx={{textAlign: "center", textWrap: "balance"}}>Asegurate de revisar la ortografía en la URL.</BodyM></Box>

        }
      </Box>
    </Box>
  )
}