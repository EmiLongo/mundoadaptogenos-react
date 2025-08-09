// src/modules/mushroom-type/components/HealthEffectsDesktop.tsx
import React, { useState } from "react";
import { Box, IconButton, keyframes } from "@mui/material";
import { brownColor, greyColor, paddingPage } from "@theme/theme";
import { IMushroomDetails } from "@/types/MushroomTypes";
import { BodyL, Heading2, Heading4 } from "@theme/textStyles";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// Animación para el texto
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

interface IHealthEffectsComponent {
  mushroom: IMushroomDetails;
}

export const HealthEffectsDesktop: React.FC<IHealthEffectsComponent> = ({
  mushroom,
}) => {
  const [indexSelected, setIndexSelected] = useState<number>(0);

  return (
    <Box
    component="section"
    sx={{
      width: "100%",
      background: greyColor[200],
      paddingY: "16px",
      ...paddingPage,
    }}
    >

      <Box sx={{ display: "flex" }}>
        {/* PRIMERA COLUMNA */}
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          width: {xs: "100%", md:"47%", lg: "39%"},
          borderRight: `2px solid ${greyColor[950]}`,
          paddingY: "24px",
          // ...shadow.small,
        }}>
          {mushroom.healthEffects.map((effect, index) => (
            <Box 
            key={`effect-${index}-${effect.title.split(" ").concat("_")}`} 
            sx={{
              paddingRight: "16px",
              width: "100%",
              display: "flex", 
              paddingY: "8px", 
              alignItems: "center", 
              justifyContent: "end",
              background: indexSelected === index ? greyColor[50] : "transparent",
              cursor: indexSelected === index ? "" : "pointer",
            }}
            onClick={() => setIndexSelected(index)}
            >
            <Heading2 
            sx={{
              textAlign: "right",
              color: indexSelected === index ? brownColor[800] : greyColor[950],
              textDecoration: indexSelected === index ? "underline" : "none",
              transition: "all 0.3s ease-out"
            }}
            >
            {effect.title}
            </Heading2>
            <IconButton sx={{
              border: "none",
              color: indexSelected === index ? "transparent" : brownColor[950],
              cursor: indexSelected === index ? "" : "pointer",
              transition: "all 0.3s ease-out",
              "&:hover": {
                background: "transparent",
              },
            }}>
              <ArrowRightIcon />
            </IconButton>
          </Box>))}
        </Box>
        {/* SEGUNDA COLUMNA */}
        <Box
          key={`effects-info-default-height`}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingY: "24px",
            paddingX: "32px",
            width: {xs: "100%", md:"47%", lg: "60%"},
            position: "relative"
          }}
        >
          <Heading2 sx={{color: "transparent",}}>
            {mushroom.healthEffects[(mushroom.healthEffects.length-1)].title}
            </Heading2>
            <Heading4 sx={{ color: "transparent"}}>
            {mushroom.healthEffects[(mushroom.healthEffects.length-1)].subtitle}
            </Heading4>
            {mushroom.healthEffects[(mushroom.healthEffects.length-1)].description.map( effect => (
              <BodyL
              key={`effect-text-${effect.split(" ").concat("_")}`} 
              sx={{color: "transparent"}}
              >
                {effect}
              </BodyL>))
            }
          <Box
            key={`effects-info-${indexSelected}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              paddingY: "24px",
              paddingX: "32px",
              width: "100%",
              position: "absolute",
              inset: 0
            }}
          >
            <Heading2 sx={{
                color: brownColor[800],
                animation: `1s ${fadeInAnimation} ease-out`
            }}>
              {mushroom.healthEffects[indexSelected].title}
              </Heading2>
              <Heading4
              sx={{
                color: brownColor[800],
                animation: `1s ${fadeInAnimation} ease-out`
              }}
              >
              {mushroom.healthEffects[indexSelected].subtitle}
              </Heading4>
              {mushroom.healthEffects[indexSelected].description.map( effect => (
                <BodyL
                key={`effect-text-${effect.split(" ").concat("_")}`} 
                sx={{animation: `1s ${fadeInAnimation} ease-out`}}
                >
                  {effect}
                </BodyL>))
              }
          </Box>
        </Box>
      </Box>
    </Box>
  )
}