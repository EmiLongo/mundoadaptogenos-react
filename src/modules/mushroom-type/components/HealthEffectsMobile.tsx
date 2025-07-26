// src/modules/mushroom-type/components/HealthEffectsMobile.tsx
import React, { useState } from "react";
import { Box, Collapse, IconButton, keyframes } from "@mui/material";
import { brownColor, greyColor, paddingPage } from "@theme/theme";
import { IMushroomDetails } from "./types";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { BodyM, Heading3, Heading4, Heading5 } from "@/theme/textStyles";

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

export const HealthEffectsMobile: React.FC<IHealthEffectsComponent> = ({
  mushroom,
}) => {
  const [indexSelected, setIndexSelected] = useState<number>(0);

  return (
    <Box
    component="section"
    sx={{
      width: "100%",
      background: greyColor[200],
      ...paddingPage,
    }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: {xs: "100%", md:"47%", lg: "39%"},
        paddingY: "24px",
      }}>
        {mushroom.healthEffects.map((effect, index) => (
          <>
          <Box 
          key={`effect-${effect.title.split(" ").concat("_")}`} 
          sx={{
            paddingRight: "16px",
            width: "100%",
            display: "flex", 
            paddingY: "8px", 
            paddingX: "16px", 
            alignItems: "center", 
            justifyContent: "space-between",
            background: indexSelected === index ? greyColor[50] : "transparent",
            cursor: "pointer",
            transition: "all 0.3s ease-out"
          }}
          onClick={() => setIndexSelected(index)}
          >
          <Heading4
          sx={{
            color: indexSelected === index ? brownColor[800] : greyColor[950],
            textDecoration: indexSelected === index ? "underline" : "none",
            transition: "all 0.3s ease-out"
          }}
          >
          {effect.title}
          </Heading4>
          <IconButton sx={{
            border: "none",
            cursor: "pointer",
            "&:hover": {
              background: "transparent",
            },
          }}>
            <ArrowDropDownIcon 
            sx={{
              transform: indexSelected === index ? "rotate(180deg)" : "rotate(0)",
              transition: "all 0.3s ease-out"
            }}
            />
          </IconButton>
        </Box>
        <Collapse 
          in={indexSelected === index}
        >
          <Box
            key={`effects-info-${indexSelected}`}
            sx={{padding: "16px", display: "flex", flexDirection: "column", gap: "8px", background: greyColor[100]}}
            >
            <Heading3 sx={{
              color: brownColor[800],
              animation: `1s ${fadeInAnimation} ease-out`
            }}>
              {effect.title}
            </Heading3>
            {effect.subtitle && <Heading5
            sx={{
              color: brownColor[800],
              animation: `1s ${fadeInAnimation} ease-out`
            }}
            >
            {effect.subtitle}
            </Heading5>}
            {effect.description.map( effect => (
              <BodyM sx={{animation: `1s ${fadeInAnimation} ease-out`}}>{effect}</BodyM>))
            }
          </Box>
        </Collapse>
        </>
        ))}
      </Box>
    </Box>
  )
}