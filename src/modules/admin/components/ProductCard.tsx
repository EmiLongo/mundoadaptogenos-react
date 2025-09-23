// src/modules/admin/components/ProductCard.tsx
import React, { useState } from "react";
import { Box, Card, CircularProgress, Divider, Link } from "@mui/material";
import { BodyMEmph, BodyS, Caption } from "@/theme/textStyles";
import { brownColor, greyColor, greenColor } from "@/theme/theme";
import { IProductWithSections } from "@/types/ProductTypes";
import { numberToPrice } from "@shared/utils/convertNumberToPrice";
import { useNavigate } from "react-router-dom";
import { SwitchCustom } from "./SwitchCustom";
import { ThumbnailImage } from "@/shared/components/cloudinary/ThumbnailImage";
import { useProducts } from "@/shared/hooks/api/useProducts";

interface IProductCard {
  product: IProductWithSections;
}

export const ProductCard: React.FC<IProductCard> = ({ product }) => {
  const navigate = useNavigate();
  const { isLoading, updateProductValidity } = useProducts();

  const handleCard = () => {
    navigate(`/admin/products-details/${product.id}/edit`);
  };

  const [checked, setChecked] = useState(product.is_valid);

  const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    const success = await updateProductValidity(product.id, event.target.checked);
    if (!success) {
      // revertir si falló
      setChecked(!event.target.checked);
    }
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
        {/* <Box
          component="img"
          src={product.urlPhoto}
          width="250px"
          sx={{ width: "100%", height: "100%" }}
          alt={`Foto descriptiva de ${product.title}`}
        /> */}
        <ThumbnailImage imgPublicId={product.img_public_id} />
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
        <BodyMEmph>{numberToPrice(product.price_discount)}</BodyMEmph>
        <Divider color={greyColor[400]}/>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap:"8px"}}>
            <Caption>Código</Caption>
            {/* en el futuro tendra que ser product.code */}
            <BodyS>{product.internal_code}</BodyS> 
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap:"8px"}}>
            <Caption>Activo</Caption>
            {isLoading 
              ? <CircularProgress /> 
              : <SwitchCustom
                checked={checked}
                onChange={handleChange}
                slotProps={{ input: { 'aria-label': 'controlled' } }}
              /> 
            }    
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
