// src/modules/admin/page/ProductDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { HeadingPage } from "@/shared/components/HeadingPage";
import { Heading3, Heading4 } from "@/theme/textStyles";
import { ProductDetailsForm } from "../components/ProductDetailsForm";
import { EProductFormMode, IProductFormValues } from "@/types/ProductTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "@/shared/hooks/api/useProduct";

export const ProductDetailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMoble = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const { product, fetchProduct, updateProduct } = useProduct();
  const originalSectionIds = product?.sections.map((section) => section.id) || [];

  const initialValues = {
    title: product?.title || "",
    description: product?.description || "",
    internal_code: product?.internal_code || "",
    price: product?.price || 0,
    price_discount: product?.price_discount || 0,
    price_transfer: product?.price_transfer || 0,
    price_without_tax: product?.price_without_tax || 0,
    plan: product?.plan || "",
    discount: product?.discount || 0,
    packaging_id: product?.packaging_id || 1,
    sectionIds: originalSectionIds,
    img_secure_url: product?.img_secure_url || "",
    img_public_id: product?.img_public_id || "",
    gallery_public_ids: product?.gallery_public_ids || [],
    is_valid: product?.is_valid || false,
  }

  const handleSubmit = async (values: IProductFormValues) => {
    const res = await updateProduct(Number(id), values, originalSectionIds);
    if (res.success) {
      console.log("Producto actualizado", res.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProduct(Number(id));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        navigate("/admin/products")
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <CircularProgress sx={{marginTop: "24px", marginLeft: "24px"}}/>
  if (!id) navigate("/admin/products");

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
      <ProductDetailsForm 
        mode={EProductFormMode.EDIT} 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
      />
    </Box>
  )
}