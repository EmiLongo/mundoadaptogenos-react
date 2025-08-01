import React from "react"
import { Box, Divider, useMediaQuery } from "@mui/material"
import { Heading2, Heading3 } from "@/theme/textStyles"
import { greyColor, paddingPage } from "@/theme/theme"
import { useTheme } from "@mui/material"
import { Carousel } from "@/modules/home/components/Carousel"
import { catalogue } from "@/shared/Layout/utils/catalogue"

export const CarouselContainer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <>
    <Box sx={{marginY: "3rem", ...paddingPage}}>  
      <Divider sx={{color: greyColor[400], marginBottom: "3rem",}} />
      {isMobile
          ? <Heading3>Más productos</Heading3>
          : <Heading2>Más productos</Heading2>}
    </Box>
    <Carousel catalogue={catalogue} sx={{marginBottom: "3rem",}}/>
    </>
  )
}