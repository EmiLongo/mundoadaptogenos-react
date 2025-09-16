import React from "react";
import { IProductWithSections } from "@/types/ProductTypes";
import { ProductCardHorizontal } from "./ProductCardHorizontal";
import { Box } from "@mui/material";

interface IContainerHorizontalCards {
  catalogue: IProductWithSections[]
}
export const ContainerHorizontalCards: React.FC<IContainerHorizontalCards> = ({catalogue}) => {
  return (
    <Box sx={{display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center"}}>
    {catalogue.map((product, index) => (
      <ProductCardHorizontal product={product} index={index} key={`card-horizontal-${product.id}`}/>
    ))}
    </Box>
  )
}
