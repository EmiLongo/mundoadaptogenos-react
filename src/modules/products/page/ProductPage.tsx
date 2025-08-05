import React from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { BigCard } from "../components/BigCard";
import { ProductBenefits } from "../components/ProductBenefits";
import { CarouselContainer } from "../components/CarouselContainer";
import { ProductsBenefitMobile } from "../components/ProductsBenefitMobile";

export const ProductPage: React.FC = () => {
  const { state } = useLocation();
  const product = state.product;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  console.log("product: ", product)
  return (
    <>
    <BigCard product={product} />
    {(isMobile && product.sectionId.length > 1) 
      ? <ProductsBenefitMobile sectionsID={product.sectionId} />
      : <ProductBenefits sectionsID={product.sectionId} />}
    <CarouselContainer />
    </>
  )
}