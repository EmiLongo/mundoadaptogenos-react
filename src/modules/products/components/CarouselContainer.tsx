import React from "react"
import { Box, Divider, useMediaQuery } from "@mui/material"
import { Heading2, Heading3 } from "@/theme/textStyles"
import { greyColor } from "@/theme/theme"
import { useTheme } from "@mui/material"
import { Carousel } from "@/modules/home/components/Carousel"
import { catalogue } from "@/shared/Layout/utils/catalogue"

export const CarouselContainer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Box sx={{marginY: "3rem"}}>  
      <Divider sx={{color: greyColor[400], marginBottom: "3rem",}} />
      {isMobile
          ? <Heading3 sx={{textAlign: "center"}}>Más productos</Heading3>
          : <Heading2 sx={{textAlign: "center"}}>Más productos</Heading2>}
      <Carousel catalogue={catalogue}/>
    </Box>
  )
}