// src/modules/admin/page/ProductDetailsPage.tsx
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { HeadingPage } from "@/shared/components/HeadingPage";
import { Heading3, Heading4 } from "@/theme/textStyles";
import { ProductDetailsForm } from "../components/ProductDetailsForm";

export const ProductDetailsPage: React.FC = () => {
  const theme = useTheme();
  const isMoble = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{
      paddingRight: {xs: "1rem", sm:"2rem", md:"4rem", lg:"5rem", xl:"8rem"},
      paddingLeft: {xs: "1rem", sm:"2rem", xl:"3rem"},
      paddingTop: {xs: "24px", md:"48px"},
      paddingBottom: {xs: "3rem", md:"3rem"},
    }}>
      <HeadingPage text="Menu Administrador para gestión de Descuentos" />
      {isMoble 
        ? <Heading4 sx={{textAlign: "center", marginBottom: "16px"}}>PRODUCTO</Heading4>
        : <Heading3 sx={{textAlign: "center", marginBottom: "16px"}}>PRODUCTO</Heading3>
      }
      <ProductDetailsForm />
    </Box>
  )
}