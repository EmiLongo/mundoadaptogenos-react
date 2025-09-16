import React, { useEffect } from "react"
import { Box, CircularProgress, Divider, useMediaQuery } from "@mui/material"
import { Heading2, Heading3, Heading4 } from "@/theme/textStyles"
import { greyColor, paddingPage } from "@/theme/theme"
import { useTheme } from "@mui/material"
import { Carousel } from "@/modules/home/components/Carousel"
import { useProductsStore } from "@/store/useProductsStore"

export const CarouselContainer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { products, isLoading, error, fetchProducts } = useProductsStore();

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products, fetchProducts]);
  
  if (isLoading) return <CircularProgress />;
  if (error) return <Heading4>Error: Recargue la página</Heading4>;

  return (
    <>
    <Box sx={{marginY: "3rem", ...paddingPage}}>  
      <Divider sx={{color: greyColor[400], marginBottom: "3rem",}} />
      {isMobile
          ? <Heading3>Más productos</Heading3>
          : <Heading2>Más productos</Heading2>}
    </Box>
    <Carousel catalogue={products} sx={{marginBottom: "3rem",}}/>
    </>
  )
}