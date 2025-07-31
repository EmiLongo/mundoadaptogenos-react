import React from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { BodyS, Caption, Heading2, Heading3 } from "@theme/textStyles";
import { greenColor, greyColor, paddingPage } from "@theme/theme";
import { IProduct } from "@shared/components/types";
import { numberToPrice } from "@shared/utils/convertNumberToPrice";
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

interface IBigCard {
  product: IProduct
}
export const BigCard: React.FC<IBigCard> = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{
      ...paddingPage
    }}>
      <BodyS sx={{marginY: "24px"}}>`Inicio / Comprar / {product.title}`</BodyS>
      <Box sx={{display: "flex", gap: "32px"}}>
        {/* primera columna */}
        <Box sx={{flex: 1, position: "relative"}}>
          <Box
            sx={{
              position: "absolute",
              top: {xs: "10px", sm: "16px"},
              right: {xs: "10px", sm: "16px"},
              display: "flex",
              gap: "8px"
            }}
          >
            <Box
              sx={{
                height: "32px",
                padding: "0.5rem",
                backgroundColor: greyColor[50],
                border: `1px ${greyColor[950]} solid`,
                color: greyColor[950],
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingX: "16px"
              }}
            >
              <LocalShippingOutlinedIcon />
              <Caption sx={{textAlign: "center" }}>
                Envío gratis
              </Caption>
            </Box>
            <Box
              sx={{
                width: "62px",
                height: "32px",
                padding: "0.5rem",
                backgroundColor: greenColor[500],
                border: `1px ${greyColor[600]} solid`,
                borderRadius: "8px",
              }}
            >
              <Caption sx={{width: "100%", textAlign: "center" }}>
                -{product.discount}%
              </Caption>
            </Box>
          </Box>
          <Box
            component="img"
            src={product.urlPhoto}
            width="100%"
            sx={{ width: "100%", height: "100%", borderRadius: "10px" }}
            alt={`Foto descriptiva de ${product.title}`}
          />
          </Box>

        {/* segunda columna */}
        <Box sx={{flex: 1}}>
        
        {isMobile
          ? <Heading3 >{product.title}</Heading3>
          : <Heading2 >{product.title}</Heading2>}
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Heading3 sx={{ color: greenColor[900],}}>{numberToPrice(product.priceDiscount)}</Heading3>
          <BodyS sx={{ color: greyColor[700], textDecoration: "line-through" }}>
            {numberToPrice(product.price)}
          </BodyS>
        </Box>
        </Box>
      </Box>
      <Divider sx={{color: greyColor[400], marginBottom: "3rem"}} />
      <Heading2>Más productos</Heading2>
    </Box>
  )
}