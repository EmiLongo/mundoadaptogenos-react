// src/modules/home/components/Highlights.tsx
import { Box } from "@mui/material"
import React from "react"
import { SectionHeading } from "@theme/textStyles"
import { Carousel } from "@/modules/home/components/Carousel"
import { catalogue } from "@/shared/Layout/utils/catalogue"


export const Shop: React.FC = () => {
  return (
    <Box sx={{
      marginBottom: "5rem",
      paddingX: {xs: "1rem", md: "3rem", lg: "4rem"},
    }}>
      {/* TODO: titulo a la izquierda cer figma */}
      <SectionHeading
      id= "section-highlights"
      sx={{
        width: "100%",
        textAlign: "center",
      }}
      >
        Productos
      </SectionHeading>
      <Carousel catalogue={catalogue}/>
    </Box>
  )
}