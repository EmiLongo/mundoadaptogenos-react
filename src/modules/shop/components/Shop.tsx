// src/modules/home/components/Highlights.tsx
import { Box, CircularProgress } from "@mui/material"
import React, { useEffect } from "react"
import { BodyS, Heading2, Heading4 } from "@theme/textStyles"
import { Carousel } from "@/modules/home/components/Carousel"
import { paddingPage } from "@/theme/theme"
import { useProductsStore } from "@/store/useProductsStore"


export const Shop: React.FC = () => {
  const { products, isLoading, error, fetchProducts } = useProductsStore();
  
  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products, fetchProducts]);
  
  if (isLoading) return <CircularProgress />;
  if (error) return <Heading4>Error: Recargue la página</Heading4>;
  
  return (
    <>
    <Box sx={{
      
      ...paddingPage
    }}>
      <BodyS sx={{marginY: "24px"}}>Inicio / Comprar</BodyS>
      <Heading2>Comprar</Heading2>
    </Box>
    <Carousel catalogue={products} sx={{marginBottom: "3rem",}}/>
    </>
  )
}