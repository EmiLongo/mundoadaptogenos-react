// src/modules/admin/page/ManageProductsPage.tsx
import React from "react"
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material"
import { ProductCard } from "../components/ProductCard"
import { HeadingPage } from "@/shared/components/HeadingPage"
import { Heading3, Heading4 } from "@/theme/textStyles"
import { ProductCardNew } from "../components/ProductCardNew"
import { useProducts } from "@/shared/hooks/api/useProducts"

export const ManageProductsPage: React.FC = () => {
  const theme = useTheme();
  const isMoble = useMediaQuery(theme.breakpoints.down("md"));

  const { products, isLoading, error } = useProducts();
  
  if(isLoading) return <CircularProgress />;
  if(error) return <Heading4>Error: Recargue la página</Heading4>;

  return (
    <Box sx={{
      paddingRight: {xs: "1rem", sm:"2rem", md:"4rem", lg:"5rem", xl:"8rem"},
      paddingLeft: {xs: "1rem", sm:"2rem", xl:"3rem"},
      paddingTop: {xs: "24px", md:"48px"},
      paddingBottom: {xs: "3rem", md:"3rem"},
    }}>
      <HeadingPage text="Menu Administrador para gestión de Productos" />
      {isMoble 
        ? <Heading4 sx={{textAlign: "center", marginBottom: "16px"}}>PRODUCTOS</Heading4>
        : <Heading3 sx={{textAlign: "center", marginBottom: "16px"}}>PRODUCTOS</Heading3>
      }
      <Box sx={{
        display: "flex", 
        justifyContent: "center",
      }}>
        <Box sx={{
          display: "flex", 
          flexWrap: "wrap", 
          columnGap: {xs: "8px", md: "16px"},
          rowGap: "24px",    // gap vertical
        }}>
          <ProductCardNew />
          {products && products.map((product) => (
            <ProductCard key={`product-card-${product.id}`} product={product} />
          ))}
        </Box>
      </Box>

    </Box>
  )
}