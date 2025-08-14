// src/modules/admin/components/ProductCard.tsx
import React from "react";
import { Box, Card, Divider, Link } from "@mui/material";
import { BodyMEmph, BodyS, Caption } from "@/theme/textStyles";
import { brownColor, greyColor, greenColor } from "@/theme/theme";
import { IProduct } from "@/types/ProductTypes";
import { numberToPrice } from "@shared/utils/convertNumberToPrice";
import { useNavigate } from "react-router-dom";
import { SwitchCustom } from "./SwitchCustom";

interface IProductCard {
  product: IProduct;
  index: number;
}

export const ProductCard: React.FC<IProductCard> = ({ product, index }) => {
  console.log(index)
  const navigate = useNavigate();
  const handleCard = () => {
    navigate("/shop/product", { state: { product } });
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Card
      elevation={3}
      sx={{
        minWidth: "167px",
        width: "167px",
        height: "344px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "43px",
          height: "28px",
          backgroundColor: greenColor[500],
          border: `1px ${greyColor[600]} solid`,
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Caption
          sx={{ color: greyColor[950], width: "100%", textAlign: "center" }}
        >
          -{product.discount}%
        </Caption>
      </Box>
      {/* imagen */}
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          cursor: "pointer"
        }}
        onClick={handleCard}
      >
        <Box
          component="img"
          src={product.urlPhoto}
          width="250px"
          sx={{ width: "100%", height: "100%" }}
          alt={`Foto descriptiva de ${product.title}`}
        />
      </Box>
      {/* parte de abajo */}
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1rem",
          gap: "8px",
          backgroundColor: greyColor[50],
        }}
      >
        <Link
        component="button"
        onClick={handleCard}
        sx={{
          textDecoration: "none",
          "&:hover": {
            color: brownColor[950],
            textDecoration: "underline",
          }
        }}
        >
          <BodyS
            sx={{
              width: "100%",
              textAlign: "left",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2, // número de líneas
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.title}
          </BodyS>
        </Link>
        <BodyMEmph>{numberToPrice(product.priceDiscount)}</BodyMEmph>
        <Divider color={greyColor[400]}/>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap:"8px"}}>
            <Caption>Código</Caption>
            {/* en el futuro tendra que ser product.code */}
            <BodyS>{product.id}</BodyS> 
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap:"8px"}}>
            <Caption>Activo</Caption>
            <SwitchCustom
              checked={checked}
              onChange={handleChange}
              slotProps={{ input: { 'aria-label': 'controlled' } }}
            />      
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
