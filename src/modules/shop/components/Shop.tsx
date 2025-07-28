// src/modules/home/components/Highlights.tsx
import { Box } from "@mui/material"
import React from "react"
import { BodyS, Heading2 } from "@theme/textStyles"
import { Carousel } from "@/modules/home/components/Carousel"
import { catalogue } from "@/shared/Layout/utils/catalogue"
import { paddingPage } from "@/theme/theme"


export const Shop: React.FC = () => {
  return (
    <>
    <Box sx={{
      
      ...paddingPage
    }}>
      <BodyS sx={{marginY: "24px"}}>Inicio / Comprar</BodyS>
      <Heading2>Comprar</Heading2>
    </Box>
    <Carousel catalogue={catalogue} sx={{marginBottom: "3rem",}}/>
    </>
  )
}