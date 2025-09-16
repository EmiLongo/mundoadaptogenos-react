// src/modules/home/components/Highlights.tsx
import { Box, CircularProgress } from "@mui/material"
import React, { useEffect } from "react"
import { Heading4, SectionHeading } from "@theme/textStyles"
import { Carousel } from "./Carousel"
import { useProductsStore } from "@store/useProductsStore";



export const Highlights: React.FC = () => {
  const { products, isLoading, error, fetchProducts } = useProductsStore();

  
  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products, fetchProducts]);
  
  if (isLoading) return <CircularProgress />;
  if (error) return <Heading4>Error: Recargue la página</Heading4>;

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
      <Carousel catalogue={products} />
    </Box>
  )
}