// src/shared/cart/CartButton.tsx
import React from "react";
import { greyColor } from "@theme/theme";
import { Badge, IconButton } from "@mui/material";
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
  return (
    <>
    <IconButton onClick={handleCartButton} sx={{border: {xs: "none", md:`1px solid ${greyColor[950]}`,} }}>
      {/* <Badge badgeContent={cartItems.length} color="primary"> */}
      <Badge 
        badgeContent={itemsCount} 
        color="primary"
        invisible={isEmpty}
        max={99}
      >
        <ShoppingCartOutlinedIcon sx={{
          color: greyColor[950], 
          "&:hover":{ color: {xs: "primary.main", md: "unset"}}}
        }/>
      </Badge>
    </IconButton>
    <CartDrawer openCartDrawer={openCartDrawer} closeCartDrawer={closeCartDrawer} />
    </>
  )
}