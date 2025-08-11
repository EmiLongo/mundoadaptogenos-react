// src/shared/cart/CartDrawerItem.tsx
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ICartItem } from "../../types/CartTypes";
import { BodyMEmph, BodyS, ButtonS } from "@theme/textStyles";
import { numberToPrice } from "@shared/utils/convertNumberToPrice";
import { WhiteButton } from "@shared/components/buttons/WhiteButton";
import { ProductCounter } from "./ProductCounter";
import { useCart } from "@store/useCartStore";
import { toast } from "react-toastify";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { greyColor, redColor } from "@/theme/theme";
import { KitOptionsModal } from "@/modules/products/components/KitOptionsModal";
import { ClickFrom } from "@/modules/products/components/BigCard";

interface ICartDrawerItem {
  cartItem: ICartItem;
  index: number;
  closeCartDrawer: ()=>void;
  selectInfo: {value: string, label: string,}[];
}
export const CartDrawerItem: React.FC<ICartDrawerItem> = ({cartItem, index, closeCartDrawer, selectInfo}) => {
  const { updateProductQuantity, removeProductByCartItemId, updateCartItemMultipleOptions, error, isLoading, clearError } = useCart();
  const [counter, setCounter] = useState<number>(cartItem.quantity);

  const [showDeleteBt, setShowDeleteBt] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>(cartItem.options as string[]);
  const [isKitOptionsModalOpen, setIsKitOptionsModalOpen] = useState<boolean>(false);

  const handleAdd = () => {
    const quantity = counter+1;
    setCounter(quantity);
    updateProductQuantity(cartItem.productId, quantity)
  }
  const handleSus = () => {
    if (counter === 1 ) {
      handleShowDelete()
      return
    };
    const quantity = counter-1;
    setCounter(quantity);
    updateProductQuantity(cartItem.productId, quantity)
  }

  const handleShowDelete = () =>{
    setShowDeleteBt(!showDeleteBt)
  }

  const handleDeleteCartItem = () => {
    setIsFetching(true)
    removeProductByCartItemId(cartItem.id);
  }

  const handleOpenOptionsModal = () => {
    setIsKitOptionsModalOpen(true);
  }

  const onCloseOptionsModal = () => {
      setIsKitOptionsModalOpen(false);
  }
  
  useEffect(() => {
    if(error){
    toast.error("Error: No se pudo borrar el Item")
    const timeout = setTimeout(() => {
      clearError();
    }, 5000);
    return () => clearTimeout(timeout); // Limpia si se desmonta antes
    }
  }, [error])

  useEffect(() => {
    if (isFetching && !isLoading) {
      setIsFetching(false)
      closeCartDrawer();
    }
  }, [isFetching])

  useEffect(() => {
    if(selectedOptions.some(option => option === "")) return
    updateCartItemMultipleOptions(cartItem, selectedOptions);
  }, [selectedOptions])

  return (
    <Box 
    key={`cart-item-${index}`}
    sx={{
      width: showDeleteBt ? "130%" : "100%",
      display: "flex", 
      alignItems: "center", 
      marginBottom: "16px", 
      overflowX: "hidden",
      gap: 0,
    }}
    > 
      <Box 
        sx={{
          display: "flex",
          justifyContent: "center", 
          alignItems: "center", 
          height: "120px",
          width: showDeleteBt ? "95px" : 0,
          opacity: showDeleteBt ? 1 : 0,
          position: "relative",
          transition: "all 0.3s ease-in-out",

        }}
      >
        <Box component="img" width="100px" height="120px"
        alt={`Foto del Producto ${index} del Carrito`}
        src={cartItem.product.urlThumbnail}
        sx={{
          borderTopRightRadius: "18px", 
          borderBottomRightRadius: "18px", 
          transform: "scaleX(-1)",
          position: "absolute",
          zIndex:2,
        }}
        />
        <Box 
          onClick={handleDeleteCartItem}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", 
            alignItems: "center", 
            gap: "4px",
            color: greyColor[50],
            width: "95px",
            height: "120px",
            background: redColor[700],
            borderRadius: "8px",
            zIndex: 3,
            cursor: "pointer",
            "&:hover":{
              background: redColor[800],
            }
          }}
        >
          <ButtonS sx={{color: "inherit"}}>BORRAR</ButtonS>
          <DeleteForeverOutlinedIcon width="24px" />
        </Box>
      </Box>
      <Box component="img" width={120} height={120}
      alt={`Foto del Producto ${index} del Carrito`}
      src={cartItem.product.urlThumbnail}
      sx={{
        border: "none",
        borderRadius: "8px",
        borderTopLeftRadius: showDeleteBt ? 0 : "8px",
        borderBottomLeftRadius: showDeleteBt ? 0 : "8px",
        marginRight: "16px"
      }}
      />
      <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
        <BodyS sx={{height: "2.5em"}}>{cartItem.product.title}</BodyS>
        <BodyMEmph>{numberToPrice(cartItem.product.price * counter)}</BodyMEmph>
        {cartItem.product.hasOptions && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "3px"}}>
            {(cartItem.options || ["", "", ""])
              .filter(option => option !== "")
              .map((option, index, arr) => {
                const infoSelected = selectInfo.find(info => info.value === option);
                return infoSelected ? (
                  <BodyS key={index}>
                    1x {infoSelected.label}
                    {index !== arr.length - 1 && ', '}
                  </BodyS>
                ) : null;
              })}
          </Box>
        )}
        <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
        {showDeleteBt
        ? <WhiteButton
          id={`delete-cart-item-${index}`}
          text="Cancelar"
          onClick={handleShowDelete}
          fetchingText={"borrando"}
          isFetching={false}
          disabled={isLoading}
          sx={{width: "150px"}}
          />
        : <>
  
          {cartItem.product.hasOptions
          ? <WhiteButton
              id="bt-drawer-edit-options"
              onClick = {handleOpenOptionsModal}
              type= {selectedOptions.some(option => option !== "") ? "grey" : "red"}
              text = {selectedOptions.some(option => option !== "") ? "EDITAR OPCIONES" : "ELEGIR OPCIONES"}
              fetchingText = ""
              isFetching = {false}
              disabled = {false}
            />
          : <ProductCounter 
          index={index}
          counter={counter} 
          handleAdd={handleAdd}
          handleSus={handleSus}
          />}
          <WhiteButton
          id={`delete-cart-item-${index}`}
          text="BORRAR"
          onClick={handleShowDelete}
          fetchingText={"borrando"}
          isFetching={false}
          disabled={isLoading}
          sx={{width: "85px"}}
          /></>}
        </Box>
      </Box>
      <KitOptionsModal
        isOpen={isKitOptionsModalOpen}
        onClose={onCloseOptionsModal}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        selectInfo={selectInfo}
        clickFrom={ClickFrom.ADD_TO_CART}
      />
    </Box>
  )
}