// src/modules/home/components/Highlights.tsx
import { Box } from "@mui/material"
import React from "react"
import { SectionHeading } from "@theme/textStyles"
import { Carousel } from "./Carousel"
import { catalogue } from "@shared/Layout/utils/catalogue";



export const Highlights: React.FC = () => {
  return (
    <Box sx={{
      marginY: "6rem",
      paddingX: {xs: "1rem", md: "3rem", lg: "4rem"},
    }}>
      <SectionHeading
      id= "section-highlights"
      sx={{
        width: "100%",
        textAlign: "center",
      }}
      >
        PRODUCTOS
      </SectionHeading>
      <Carousel catalogue={catalogue} />
    </Box>
  )
}