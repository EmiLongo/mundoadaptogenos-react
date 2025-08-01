import React from "react";
import { useLocation } from "react-router-dom";
import { BigCard } from "../components/BigCard";
import { ProductBenefits } from "../components/ProductBenefits";
import { CarouselContainer } from "../components/CarouselContainer";

export const ProductPage: React.FC = () => {
  const { state } = useLocation();
  const product = state.product;

  return (
    <>
    <BigCard product={product} />
    <ProductBenefits sectionsID={product.sectionId} />
    <CarouselContainer />
    </>
  )
}