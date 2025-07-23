// src/modules/home/components/PresentationPower.tsx
import { BodyMEmph, Heading1, Heading3 } from "@/theme/textStyles";
import { brownColor, greenColor, greyColor } from "@/theme/theme";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import medal from "@img/home/mushroom-power/medal.svg"
import capsulas from "@img/home/mushroom-power/capsulas.svg"
import frasco from "@img/home/mushroom-power/frasco.svg"
import hongo from "@img/home/mushroom-power/hongo.svg"
import polvo from "@img/home/mushroom-power/polvo.svg"
import tintura from "@img/home/mushroom-power/tintura.svg"
import puntoHongo from "@img/home/mushroom-power/punto-hongo.svg"
import puntoHongoBlanco from "@img/home/mushroom-power/punto-hongo-blanco.svg"
import puntoMedioHongo from "@img/home/mushroom-power/punto-medio-hongo.svg"
import puntoVacioHongo from "@img/home/mushroom-power/punto-vacio-hongo.svg"
export const PresentationPower: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Box sx={{
      position: "relative", 
      maxWidth: {xl:"1100px"}, 
      marginX: "auto", 
      marginTop: {xs:"3rem", md: 0},
      paddingX: {xs:0 , md: "4rem", lg: "5rem", xl:0}
    }}>
      <Heading3 sx={{width: "100%", textAlign: "center"}}>Te ofrecemos la opción con</Heading3>
      <Heading1 sx={{width: "100%", textAlign: "center", fontWeight: 800, marginTop: "1rem", marginBottom: {xs:"1rem", md: "1rem"} }}>MÁXIMA POTENCIA</Heading1>
      <Box sx={{display: "flex", flexDirection: {xs: "column", md: "row"}, position: "relative", alignItems: {xs: "center", md: "start"}}}>
        {/* frasco con gotero */}
        <Box sx={{display: "flex", flexDirection: {xs: "row", md: "column"}, height: {xs: "200px", md: "unset"},  gap: {xs:"3rem", md: 0}}}>
          <Box sx={{
            width: {xs: "150px", md: "240px"}, 
            height: {xs: "200px", md: "240px"}, 
            backgroundColor: brownColor[950], 
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: {xs: "center", md: "end"},
            position: "relative"
          }}>
            <Box component="img" src={frasco} alt="Nuestra presentación de frasco con gotero" />
            {!isMobile && <>
            <Box component="img" src={medal} sx={{position:"absolute", top: "12px", right:"12px"}} alt="Etiqueta para reconocer nuestro producto" />
            <BodyMEmph sx={{color: greenColor[300], marginBottom: "1rem", marginTop: "1.5rem" }}>DOBLE EXTRACTO</BodyMEmph>
            </>}
          </Box>
          <Box sx={{
            height: {xs: "200px", md: "unset"},
            width: {xs: "150px", md: "unset"},
            display: "flex", 
            flexDirection: {xs: "column", md: "row"},
            justifyContent: "center",
            alignItems: {xs: "center", sm: "start"},
            gap: "4px", 
            marginTop: {xs: 0, md:"3rem"}, 
            marginBottom: "1rem",
            backgroundColor: {xs: brownColor[950], md: "transparent"},
            borderRadius: "8px",
            position: "relative"
          }}>
            {isMobile && <>
            <Box component="img" src={medal} sx={{position:"absolute", top: "12px", right:"12px"}} alt="Etiqueta para reconocer nuestro producto" />
            <BodyMEmph sx={{
              color: greyColor[50], 
              marginBottom: "1rem", 
              marginTop: "1.5rem",
              textAlign: {xs: "center", md: "left"}
             }}>
              DOBLE EXTRACTO

            </BodyMEmph>
            </>}
            <Box sx={{display: "flex", justifyContent: {xs: "start", md: "center"},}}>
              <Box component="img" src={isMobile ? puntoHongoBlanco : puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={isMobile ? puntoHongoBlanco : puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={isMobile ? puntoHongoBlanco : puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={isMobile ? puntoHongoBlanco : puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={isMobile ? puntoHongoBlanco : puntoHongo} alt="Puntaje con forma de hongo" />
            </Box>
          </Box>
        </Box>
        {/* capsulas */}
        <Box sx={{flex:1, display: "flex", flexDirection: {xs: "row", md: "column"}, alignItems: "center", gap: {xs:"3rem", md:0}}}>
          <Box sx={{height: {xs: "150px", md: "240px"}, width: {xs: "150px", md: "unset"}, display:"flex", flexDirection: "column", alignItems:"center", justifyContent: "end",}}>
            <Box component="img" src={capsulas} alt="Presentación en cápsulas" />
            {!isMobile && <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Cápsulas</BodyMEmph>}
          </Box>
          <Box sx={{display: "flex", 
            justifyContent: "center",
            alignItems: {xs: "center", sm: "start"},
            gap: "4px", 
            marginTop: {xs: 0, md: "3rem"}, 
            marginBottom: {xs: 0, md: "1rem"},
            width: {xs: "150px", md: "unset"},
            flexDirection: {xs: "column", md: "row"},
          }}>
            {isMobile && <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Cápsulas</BodyMEmph>}
            <Box sx={{display: "flex", justifyContent: {xs: "start", md: "center"},}}>
              <Box component="img" src={puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoMedioHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoVacioHongo} alt="Puntaje con forma de hongo" />
            </Box>
          </Box>
        </Box>
        {/* tintura madre */}
        <Box sx={{flex:1, display: "flex", flexDirection: {xs: "row", md: "column"}, alignItems: "center", gap: {xs:"3rem", md:0}}}>
          <Box sx={{height: {xs: "150px", md: "240px"}, width: {xs: "150px", md: "unset"}, display:"flex", flexDirection: "column", alignItems:"center", justifyContent: "end",}}>
            <Box component="img" src={tintura} alt="Presentación en tintura" />
            {!isMobile && <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Tintura Madre</BodyMEmph>}
          </Box>
          <Box sx={{
            display: "flex", 
            justifyContent: "center",
            alignItems: {xs: "center", sm: "start"}, 
            gap: "4px", 
            marginTop: {xs: 0, md: "3rem"}, 
            marginBottom: {xs: 0, md: "1rem"},
            width: {xs: "150px", md: "unset"},
            flexDirection: {xs: "column", md: "row"},
          }}>
            {isMobile && <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Tintura Madre</BodyMEmph>}
            <Box sx={{display: "flex", justifyContent: {xs: "start", md: "center"},}}>
              <Box component="img" src={puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoVacioHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoVacioHongo} alt="Puntaje con forma de hongo" />
            </Box>
          </Box>
        </Box>
        {/* polvo de hongos */}
        <Box sx={{flex:1, display: "flex", flexDirection: {xs: "row", md: "column"}, alignItems: "center", gap: {xs:"3rem", md:0}}}>
          <Box sx={{height: {xs: "150px", md: "240px"}, width: {xs: "150px", md: "unset"}, display:"flex", flexDirection: "column", alignItems:"center", justifyContent: "end",}}>
            <Box component="img" src={polvo} alt="Presentación en polvo" />
            {!isMobile && <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Polvo</BodyMEmph>}
          </Box>
          <Box sx={{
            display: "flex", 
            justifyContent: "center",
            alignItems: {xs: "center", sm: "start"}, 
            gap: "4px", 
            marginTop: {xs: 0, md: "3rem"}, 
            marginBottom: {xs: 0, md: "1rem"},
            width: {xs: "150px", md: "unset"},
            flexDirection: {xs: "column", md: "row"},
          }}>
            {isMobile && <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Polvo</BodyMEmph>}
            <Box sx={{display: "flex", justifyContent: {xs: "start", md: "center"},}}>
              <Box component="img" src={puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoMedioHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoVacioHongo} alt="Puntaje con forma de hongo" />
              <Box component="img" src={puntoVacioHongo} alt="Puntaje con forma de hongo" />
            </Box>
          </Box>
        </Box>
        {/* hongo puro */}
        <Box sx={{flex:1, display: "flex", flexDirection: {xs: "row", md: "column"}, alignItems: "center", gap: {xs:"3rem", md:0}}}>
          <Box sx={{height: {xs: "150px", md: "240px"}, width: {xs: "150px", md: "unset"}, display:"flex", flexDirection: "column", alignItems:"center", justifyContent: "end",}}>
            <Box component="img" src={hongo} alt="Presentación en hongo crudo" />
            {!isMobile && <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Hongo puro</BodyMEmph>}
          </Box>
          <Box sx={{
            display: "flex", 
            justifyContent: "center",
            alignItems: {xs: "center", sm: "start"}, 
            gap: "4px", 
            marginTop: {xs: 0, md: "3rem"}, 
            marginBottom: {xs: 0, md: "1rem"},
            width: {xs: "150px", md: "unset"},
            flexDirection: {xs: "column", md: "row"},
          }}>
            {isMobile && <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Hongo puro</BodyMEmph>}
            <Box sx={{display: "flex", justifyContent: {xs: "start", md: "center"},}}>
              <Box component="img" src={puntoHongo} alt="Puntaje con forma de hongo"/>
              <Box component="img" src={puntoVacioHongo} alt="Puntaje con forma de hongo"/>
              <Box component="img" src={puntoVacioHongo} alt="Puntaje con forma de hongo"/>
              <Box component="img" src={puntoVacioHongo} alt="Puntaje con forma de hongo"/>
              <Box component="img" src={puntoVacioHongo} alt="Puntaje con forma de hongo"/>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{
        width: {xs: "12px", md:"90%", xl: "100%"}, 
        height: {xs: "89%", md:"16px"}, 
        borderRadius: "8px",
        background: {xs: "linear-gradient(180deg,rgba(41, 23, 17, 1) 0%, rgba(144, 74, 29, 1) 33%, rgba(239, 192, 123, 1) 72%, rgba(252, 238, 216, 1) 100%)",
                    md: "linear-gradient(90deg,rgba(41, 23, 17, 1) 0%, rgba(144, 74, 29, 1) 33%, rgba(239, 192, 123, 1) 72%, rgba(252, 238, 216, 1) 100%)"},
        position: "absolute",
        bottom: {xs: 0, md: "3.2rem"},
        left: {xs: "50vw", md: "5%", xl:0},
        transform: {xs: "translateX(-50%)", md: "translateX(0)"}, 
        zIndex: 100,
      }}/>
    </Box>
  )
}