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
        Productos
      </SectionHeading>
      <Box sx={{
        display: "grid",
        gridTemplateColumns: {xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 250px)", lg: "repeat(4, 250px)", xl: "repeat(5, 250px)"},
        gap: {sx: "1rem", xl: "1.5rem"},
        justifyContent: "center"
      }}>
        {catalogue.map((product, index) => (
          <ProductCard product={product} index={index} />
        ))}
      </Box>
    </Box>
  )
}