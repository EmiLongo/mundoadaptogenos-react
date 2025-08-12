// src/shared/cart/ProductConfirm.tsx
import React, { useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { numberToPrice } from "@shared/utils/convertNumberToPrice";
import { WhiteButton } from "@shared/components/buttons/WhiteButton";
import { BodyMEmph, BodyS } from "@theme/textStyles";
import { brownColor, greyColor } from "@theme/theme";
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from "@/store/useCartStore";
import { IProduct } from "@/types/ProductTypes";
import { heightForModals, navBarMobileHeight } from "../Layout/utils/info";

interface IProductConfirm {
  handleCartDrawerOpen: ()=>void;
  lastAddedProduct: (IProduct & { quantity: number });
  lastAddedAt: string | null | undefined;
}
export const ProductConfirm: React.FC<IProductConfirm> = ({ handleCartDrawerOpen, lastAddedProduct }) => {
  const { clearLastAdded } = useCart();

  // TODO: hacer lógica de cierre
  const handleCloseProductConfirm = () => {
    clearLastAdded();
  }

  //TODO: que pasa si hay mas de un producto que se carga en el carrito???
  useEffect(() => {
    if (lastAddedProduct && lastAddedProduct) {
      const timeout = setTimeout(() => {
        clearLastAdded(); // Limpiar el ultimo producto agregado
      }, 5000);
      return () => clearTimeout(timeout); // Limpia si se desmonta antes
    }
  }, [lastAddedProduct]);

  return (
    <Box sx={{
      width: "260px",
      height: "270px",
      backgroundColor: greyColor[50],
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px",
      border: `1px ${greyColor[950]} solid`,
      borderRadius: "8px",
      position: "fixed",
      right:{xs: "1rem", sm: "2rem", md: "4rem", lg:"5rem", xl:"8rem"},
      top: {xs: navBarMobileHeight, md: heightForModals},
      zIndex: 1200,
    }}>
      {/* Foto y detalle */}
      <Box 
      sx={{
        width: "100%",
        display: "flex", 
        // alignItems: "center", 
        // justifyContent: "start", 
        gap: "8px", 
        marginBottom: "16px",
        position: "relative",
      }}
      >
        <IconButton 
          id="bti-close-product-confirm"
          onClick={handleCloseProductConfirm}
          sx={{position: "absolute", top: 0, right: "-4px", border: "none"}}
        >
          <CloseIcon sx={{width: "24px", color: greyColor[950]}} />
        </IconButton>
        <Box component="img" width={50} height={50}
        alt={`Foto del Producto ${lastAddedProduct?.title}`}
        src={lastAddedProduct?.urlThumbnail}
        sx={{borderRadius: "8px"}}
        />
        <Box sx={{
          width: "145px",
          display: "flex", 
          flexDirection: "column", 
          gap: "8px"
        }}>
          <BodyS sx={{height: "4em"}}>{lastAddedProduct?.title}</BodyS>
          <BodyS>{lastAddedProduct?.quantity} x {numberToPrice(lastAddedProduct?.price || 0)}</BodyS>
        </Box>
      </Box>

      <BodyMEmph sx={{color: brownColor[700]}}>¡Agregado al carrito!</BodyMEmph>
      <Box sx={{display: "flex", flexDirection:"column", alignItems: "center"}}>
        <BodyMEmph>TOTAL ({lastAddedProduct?.quantity} producto{lastAddedProduct?.quantity > 1 && "s"}):</BodyMEmph>
        <BodyMEmph>{numberToPrice((lastAddedProduct?.price * lastAddedProduct?.quantity) || 0)}</BodyMEmph>
      </Box>

      <WhiteButton
      id={`confirm-cart-item`}
      text="VER CARRITO"
      onClick={handleCartDrawerOpen}
      fetchingText={"borrando"}
      isFetching={false}
      disabled={false}
      sx={{width: "100%"}}
      />
    </Box>
  )
}