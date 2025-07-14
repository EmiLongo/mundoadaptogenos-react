// src/shared/cart/CartButton.tsx
import React from "react";
import { Badge, IconButton, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { CartDrawer } from "./CartDrawer";
import { useCart } from "@store/useCartStore";

interface ICartButton {
  openCartDrawer: boolean;
  closeCartDrawer: ()=>void;
  handleCartButton: ()=>void;
}
export const CartButton: React.FC<ICartButton> = ({openCartDrawer, closeCartDrawer, handleCartButton}) => {
  const { itemsCount, isEmpty } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
    {isMobile
    ? <IconButton 
        id="bti-cart-mobile"
        onClick={handleCartButton} 
        color="secondary"
      >
        <Badge 
          badgeContent={itemsCount} 
          color="primary"
          invisible={isEmpty}
          max={99}
        >
          <ShoppingCartOutlinedIcon />
        </Badge>
      </IconButton>
    : <>
      <IconButton 
        id="bti-cart-desktop"
        onClick={handleCartButton} 
      >
        <Badge 
          badgeContent={itemsCount} 
          color="primary"
          invisible={isEmpty}
          max={99}
        >
          <ShoppingCartOutlinedIcon />
        </Badge>
      </IconButton>
      </>
    }
    <CartDrawer openCartDrawer={openCartDrawer} closeCartDrawer={closeCartDrawer} />
    </>
  )
}