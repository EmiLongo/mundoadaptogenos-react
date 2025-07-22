// src/shared/cart/ProductCard.tsx
import React from "react"
import { Box, Card } from "@mui/material"
import { BodyS, Caption, Heading3, Heading5 } from "@/theme/textStyles"
import { WhiteButton } from "@shared/components/buttons/WhiteButton"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { brownColor, greyColor, greenColor } from "@/theme/theme";
import { IProduct } from "../components/types";
import { numberToPrice } from "@shared/utils/convertNumberToPrice";
import { useCart } from "@store/useCartStore";

interface IProductCard {
  product: IProduct;
  index: number;
}

export const ProductCard: React.FC<IProductCard> = ({ product, index }) => {
  const { addProduct } = useCart();
  const addToCart = () => {
    addProduct(product, 1); // cantidad = 1
  };
  return (
    <Card 
    elevation={3}
    sx={{
      minWidth: "250px",
      width: '250px',
      height: '500px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <Box sx={{
        position: 'absolute',
        top: "10px",
        left: "10px",
        width: '62px',
        height: '32px',
        padding: '0.5rem',
        backgroundColor: greenColor[500],
        border: `1px ${greyColor[600]} solid`,
        borderRadius: '8px',
      }}>
        <Caption sx={{color: greyColor[950], width: "100%", textAlign: "center"}}>-{product.discount}%</Caption>
      </Box>
      <Box sx={{ width: "100%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center", overflow: 'hidden',}}>
        <Box 
        component="img" 
        src={product.urlPhoto} 
        width='250px'
        sx={{ width: '100%', height: '100%' }}
        alt={`Foto descriptiva de ${product.title}`}
        />
      </Box>
      <Box sx={{
        width: "100%",
        height: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundColor: greyColor[50],
      }}>
        <Heading5 sx={{height: "4.5em"}}>{product.title}</Heading5>
        <Box sx={{display: "flex", alignItems: "center", gap: "16px"}}>
          <Heading3>{numberToPrice(product.priceDiscount)}</Heading3>
          <BodyS sx={{color: greyColor[700], textDecoration: "line-through"}}>{numberToPrice(product.price)}</BodyS>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", gap: "5px"}}>
          <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
            <BodyS sx={{color: brownColor[700]}}>{numberToPrice(product.priceTransfer)}</BodyS>
            <BodyS sx={{color: greyColor[700]}}>Transf./ Depósito</BodyS>
          </Box>
          <BodyS sx={{color: brownColor[700]}}>{product.plan}</BodyS>
        </Box>
        <WhiteButton
          id={`add-cart-${index}`}
          text="AÑADIR AL CARRITO"
          fetchingText="AÑADIENDO..."
          onClick={addToCart}
          isFetching={false}
          icon={<ShoppingCartOutlinedIcon />}
          disabled={false}
          sx={{borderRadius: "30px", width: "100%"}}
        />
      </Box>
    </Card>
  )
}