import React from "react";
import { IProduct } from "../components/types";
import { ProductCardHorizontal } from "./ProductCardHorizontal";
import { Box } from "@mui/material";

interface IContainerHorizontalCards {
  catalogue: IProduct[]
}
export const ContainerHorizontalCards: React.FC<IContainerHorizontalCards> = ({catalogue}) => {
  return (
    <Box sx={{display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center"}}>
    {catalogue.map((product, index) => (
      <ProductCardHorizontal product={product} index={index} />
    ))}
    </Box>
  )
}
