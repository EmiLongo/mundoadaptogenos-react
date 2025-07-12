// src/modules/home/components/Highlights.tsx
import { Box } from "@mui/material"
import React from "react"
import { SectionHeading } from "@theme/textStyles"
import { catalogue } from "@shared/Layout/utils/catalogue"
import { ProductCard } from "@shared/cart/ProductCard"


export const Highlights: React.FC = () => {
  return (
    <Box sx={{
      marginBottom: "5rem",
      paddingX: {xs: "1rem", md: "3rem", lg: "4rem"},
    }}>
      <SectionHeading
      id= "section-highlights"
      sx={{
        width: "100%",
        textAlign: "center",
      }}
      >
        Destacados
      </SectionHeading>
      <Box sx={{
        display: "grid",
        gridTemplateColumns: {xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)"},
        gap: {xs: "1rem", md: "1.5rem", lg: "2rem"},
      }}>
        {catalogue.map((product, index) => (
          <ProductCard product={product} index={index} />
        ))}
      </Box>
    </Box>
  )
}