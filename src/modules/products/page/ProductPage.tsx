import React from "react";

import { catalogue } from "@shared/Layout/utils/catalogue";
import { Carousel } from "@modules/home/components/Carousel";
import { IProduct } from "@/shared/components/types";
import { useLocation } from "react-router-dom";
import { BigCard } from "../components/BigCard";

interface IProductPage {
  product: IProduct
}

export const ProductPage: React.FC<IProductPage> = () => {
  const { state } = useLocation();
  const product = state.product;

  return (
    <>
    <BigCard product={product} />
    <Carousel catalogue={catalogue} sx={{marginBottom: "3rem",}}/>
    </>
  )
}