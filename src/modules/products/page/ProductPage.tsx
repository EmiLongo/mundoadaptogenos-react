// src\modules\products\page\ProductPage.tsx
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery, useTheme, Box, CircularProgress, Typography } from "@mui/material";
import { BigCard } from "../components/BigCard";
import { ProductBenefits } from "../components/ProductBenefits";
import { CarouselContainer } from "../components/CarouselContainer";
import { ProductsBenefitMobile } from "../components/ProductsBenefitMobile";
import { useProductsStore } from "@/store/useProductsStore";
import { hasSectionWithOptions } from "@/shared/utils/productHasOptions";

export const ProductPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { getProductByCode } = useProductsStore();
  const product = code ? getProductByCode(code) : undefined;
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll al inicio cuando se monta el componente
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Si no hay código en la URL, redirigir inmediatamente
    if (!code) {
      navigate("/", { replace: true });
      return;
    }

    // Si hay código pero no se encuentra el producto, redirigir
    if (code && !product) {
      // Opcional: agregar un pequeño delay para evitar parpadeos
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [code, product, navigate]);

  if (!code || !product) {
    // Mostrar loading mientras se procesa la redirección
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="50vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Cargando producto...
        </Typography>
      </Box>
    );
  }

  // Verificar que el producto tenga las propiedades necesarias
  if (!product.sections) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="50vh"
      >
        <Typography variant="h6" color="error">
          Producto incompleto. Por favor, intenta nuevamente.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <BigCard product={product} />
      {(isMobile && hasSectionWithOptions(product.sections)) 
        ? <ProductsBenefitMobile sections={product.sections} />
        : <ProductBenefits sections={product.sections} />
      }
      <CarouselContainer />
    </>
  );
};