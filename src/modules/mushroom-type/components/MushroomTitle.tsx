// src/modules/mushroom-type/components/MushroomTitle.tsx
import { Box } from "@mui/material";
import React from "react";
import { IMushroomDetails } from "@shared/types/MushroomTypes";
import { BodyL, BodyM, DisplayHeadingXL, Heading1, Heading2, Heading4 } from "@/theme/textStyles";
import { greyColor } from "@/theme/theme";

interface IMushroomTitleComponent {
  mushroom: IMushroomDetails;
  isMobile: boolean;
  isLargeScreen: boolean;
}

export const MushroomTitle: React.FC<IMushroomTitleComponent> = ({mushroom, isMobile, isLargeScreen}) => {
  return (
    <>
    <Box
      sx={{
        height: {xs:"150px", md:"240px"},
        backgroundImage: `url(${mushroom.imgTitle})`,
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {isMobile 
        ? <><Heading1 sx={{color: greyColor[50], textAlign: "center", zIndex: 10}}>{mushroom.title}</Heading1>
            <Heading4 sx={{color: greyColor[50], textAlign: "center", zIndex: 10}}>{mushroom.subtitle}</Heading4></>
        : <><DisplayHeadingXL sx={{color: greyColor[50], zIndex: 10}}>{mushroom.title}</DisplayHeadingXL>
            <Heading2 sx={{color: greyColor[50], zIndex: 10}}>{mushroom.subtitle}</Heading2></>
      }
      <Box sx={{backgroundColor: "#000", opacity: 0.2, position: "absolute", inset: 0}}/>
    </Box>

    {/* descripción breve */}
    {isLargeScreen
      ? <BodyL sx={{textAlign: "center", paddingY: "40px", paddingX: {lg: "5rem", xl: "8rem"}}}>{mushroom.basicDescription}</BodyL>
      : <BodyM sx={{textAlign: "center", paddingY: "24px", paddingX: {xs: "1rem", sm: "2rem", md: "4rem"}}}>{mushroom.basicDescription}</BodyM>
    }
    </>
  )
}