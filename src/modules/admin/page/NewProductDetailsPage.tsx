// src/modules/admin/page/NewProductDetailsPage.tsx
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { HeadingPage } from "@/shared/components/HeadingPage";
import { Heading3, Heading4 } from "@/theme/textStyles";
import { ProductDetailsForm } from "../components/ProductDetailsForm";
import { EProductFormMode, IProductFormValues } from "@/types/ProductTypes";
import { useProduct } from "@/shared/hooks/api/useProduct";

export const NewProductDetailsPage: React.FC = () => {
  const theme = useTheme();
  const isMoble = useMediaQuery(theme.breakpoints.down("md"));

  const initialValues = {
    title: "",
    description: "",
    internal_code: "",
    price: 0,
    price_discount: 0,
    price_transfer: 0,
    price_without_tax: 0,
    plan: "",
    discount: 0,
    packaging_id: 1,
    sectionIds: [] as number[],
    img_secure_url: "",
    img_public_id: "",
    gallery_public_ids: [] as string[],
    is_valid: true,
  }
  const { createProduct } = useProduct();

  const handleSubmit = async (values: IProductFormValues) => {
    const res = await createProduct(values);
    if (!res.success) {
      console.error(res.error);
    }
  };

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
      <ProductDetailsForm mode={EProductFormMode.CREATE} initialValues={initialValues} onSubmit={handleSubmit} />
    </Box>
  )
}