// src/shared/cart/CartDrawerItem.tsx
import { Box } from "@mui/material";
import React, { useState } from "react";
import { ICartItem } from "./types";
import { BodyMEmph, BodyS } from "@theme/textStyles";
import { numberToPrice } from "@shared/utils/convertNumberToPrice";
import { WhiteButton } from "@shared/components/buttons/WhiteButton";
import { ProductCounter } from "./ProductCounter";
import { useCart } from "@store/useCartStore";
import { ModalDeleteCartItem } from "./ModalDeleteCartItem";

interface ICartDrawerItem {
  cartItem: ICartItem;
  index: number;
  closeCartDrawer: ()=>void;
}
export const CartDrawerItem: React.FC<ICartDrawerItem> = ({cartItem, index, closeCartDrawer}) => {
  const { updateProductQuantity, isLoading } = useCart();
  const [counter, setCounter] = useState<number>(cartItem.quantity);
  const [openDeleteItemModal, setOpenDeleteItemModal] = useState<boolean>(false);

  const handleAdd = () => {
    const quantity = counter+1;
    setCounter(quantity);
    updateProductQuantity(cartItem.productId, quantity)
  }
  const handleSus = () => {
    if (counter === 1 ) return;
    const quantity = counter-1;
    setCounter(quantity);
    updateProductQuantity(cartItem.productId, quantity)
  }

  const handleDeleteCartItem = () =>{
    setOpenDeleteItemModal(true)
  }

  const handleToogleDeleteItemModal = () => {
    setOpenDeleteItemModal(!openDeleteItemModal)
  }

  return (
    <Box 
    key={`cart-item-${index}`}
    sx={{display: "flex", alignItems: "center", gap: "1rem", marginBottom: "16px"}}
    >
      <Box component="img" width={120} height={120}
      alt={`Foto del Producto ${index} del Carrito`}
      src={cartItem.product.urlThumbnail}
      sx={{borderRadius: "8px"}}
      />
      <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
        <BodyS sx={{height: "2.5em"}}>{cartItem.product.title}</BodyS>
        <BodyMEmph>{numberToPrice(cartItem.product.price * counter)}</BodyMEmph>
        <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
          <ProductCounter 
          index={index}
          counter={counter} 
          handleAdd={handleAdd}
          handleSus={handleSus}
          />
          <WhiteButton
          id={`delete-cart-item-${index}`}
          text="BORRAR"
          onClick={() => handleDeleteCartItem()}
          fetchingText={"borrando"}
          isFetching={false}
          disabled={isLoading}
          sx={{width: "85px"}}
          />
        </Box>
      </Box>
      {openDeleteItemModal && 
        <ModalDeleteCartItem 
          openDeleteModal={openDeleteItemModal} 
          closeDeleteItemModal={handleToogleDeleteItemModal} 
          cartItem={cartItem}
          closeCartDrawer={closeCartDrawer}  
        />
      }
    </Box>
  )
}