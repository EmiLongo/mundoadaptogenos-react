import { BodyMEmph, Heading1, Heading3 } from "@/theme/textStyles";
import { brownColor, greenColor } from "@/theme/theme";
import { Box } from "@mui/material";
import React from "react";
import medal from "@img/home/mushroom-power/medal.svg"
import capsulas from "@img/home/mushroom-power/capsulas.svg"
import frasco from "@img/home/mushroom-power/frasco.svg"
import hongo from "@img/home/mushroom-power/hongo.svg"
import polvo from "@img/home/mushroom-power/polvo.svg"
import tintura from "@img/home/mushroom-power/tintura.svg"
import puntoHongo from "@img/home/mushroom-power/punto-hongo.svg"
import puntoMedioHongo from "@img/home/mushroom-power/punto-medio-hongo.svg"
import puntoVacioHongo from "@img/home/mushroom-power/punto-vacio-hongo.svg"
export const PresentationPower: React.FC = () => {
  return (
    <Box sx={{position: "relative", maxWidth: {xl:"1100px"}, marginX: "auto"}}>
      <Heading3 sx={{width: "100%", textAlign: "center"}}>Te ofrecemos la opción con</Heading3>
      <Heading1 sx={{width: "100%", textAlign: "center", fontWeight: 800, marginY: "1rem" }}>MÁXIMA POTENCIA</Heading1>
      <Box sx={{display: "flex", position: "relative"}}>
        <Box>
          <Box sx={{
            width: "240px", 
            height: "240px", 
            backgroundColor: brownColor[950], 
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "end",
            position: "relative"
          }}>
            <Box component="img" src={medal} sx={{position:"absolute", top: "12px", right:"12px"}}/>
            <Box component="img" src={frasco} />
            <BodyMEmph sx={{color: greenColor[300], marginBottom: "1rem", marginTop: "1.5rem" }}>DOBLE EXTRACTO</BodyMEmph>
          </Box>
          <Box sx={{display: "flex", justifyContent: "center", gap: "4px", marginTop: "3rem", marginBottom: "1rem"}}>
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoHongo} />
          </Box>
        </Box>
        <Box sx={{flex:1,}}>
          <Box sx={{height: "240px", display:"flex", flexDirection: "column", alignItems:"center", justifyContent: "end",}}>
            <Box component="img" src={capsulas} />
            <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Cápsulas</BodyMEmph>
          </Box>
          <Box sx={{display: "flex", justifyContent: "center", gap: "4px", marginTop: "3rem", marginBottom: "1rem"}}>
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoMedioHongo} />
            <Box component="img" src={puntoVacioHongo} />
          </Box>
        </Box>
        <Box sx={{flex:1,}}>
          <Box sx={{height: "240px", display:"flex", flexDirection: "column", alignItems:"center", justifyContent: "end",}}>
            <Box component="img" src={tintura} />
            <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Tintura Madre</BodyMEmph>
          </Box>
          <Box sx={{display: "flex", justifyContent: "center", gap: "4px", marginTop: "3rem", marginBottom: "1rem"}}>
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoVacioHongo} />
            <Box component="img" src={puntoVacioHongo} />
          </Box>
        </Box>
        <Box sx={{flex:1,}}>
          <Box sx={{height: "240px", display:"flex", flexDirection: "column", alignItems:"center", justifyContent: "end",}}>
            <Box component="img" src={polvo} />
            <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Polvo</BodyMEmph>
          </Box>
          <Box sx={{display: "flex", justifyContent: "center", gap: "4px", marginTop: "3rem", marginBottom: "1rem"}}>
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoMedioHongo} />
            <Box component="img" src={puntoVacioHongo} />
            <Box component="img" src={puntoVacioHongo} />
          </Box>
        </Box>
        <Box sx={{flex:1,}}>
          <Box sx={{height: "240px", display:"flex", flexDirection: "column", alignItems:"center", justifyContent: "end",}}>
            <Box component="img" src={hongo} />
            <BodyMEmph sx={{marginBottom: "1rem", marginTop: "1.5rem"}}>Hongo puro</BodyMEmph>
          </Box>
          <Box sx={{display: "flex", justifyContent: "center", gap: "4px", marginTop: "3rem", marginBottom: "1rem"}}>
            <Box component="img" src={puntoHongo} />
            <Box component="img" src={puntoVacioHongo} />
            <Box component="img" src={puntoVacioHongo} />
            <Box component="img" src={puntoVacioHongo} />
            <Box component="img" src={puntoVacioHongo} />
          </Box>
        </Box>
      </Box>
      <Box sx={{
        width:"100%", 
        height:"16px", 
        borderRadius: "8px",
        background: "linear-gradient(90deg,rgba(41, 23, 17, 1) 0%, rgba(144, 74, 29, 1) 33%, rgba(239, 192, 123, 1) 72%, rgba(252, 238, 216, 1) 100%)",
        position: "absolute",
        bottom: "3.2rem",
        left: 0,
        zIndex: 100,
      }}/>
    </Box>
  )
}