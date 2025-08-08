// src/shared/cart/CartDrawer.tsx
import React from "react";
import { Box, Divider, Drawer } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { BodyS, Heading2, Heading4 } from "@theme/textStyles";
import { greyColor } from "@theme/theme";
import { CartDrawerItem } from "./CartDrawerItem";
import { numberToPrice } from "../utils/convertNumberToPrice";
import { ColorButton } from "@shared/components/buttons/ColorButton";
import { OnlyTextButton } from "@shared/components/buttons/OnlyTextButton";
import { useNavigate } from "react-router-dom";
import { useCart } from "@store/useCartStore";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { filterByPackagingIdByNotSectionId } from "../Layout/utils/filterProducts";
import { catalogue } from "../Layout/utils/catalogue";

interface ICartDrawerProps {
  openCartDrawer: boolean
  closeCartDrawer: () => void
}
// TODO
// si está logueado buscar el carrito por userId y sino por sessionId
export const CartDrawer: React.FC<ICartDrawerProps> = ({openCartDrawer = false, closeCartDrawer = () => {}}) => {
  const { cart, itemsCount, totalWithDiscount } = useCart();
  const navigate = useNavigate();
  // TODO agregar verificacion al login
  const isAuth: boolean = false;
  const handleStartCheckout = () => {
    closeCartDrawer();
    navigate("./cart");
  }

  const handleKeepShopping = () => {
    closeCartDrawer();
    navigate("./shop");
  }

  const products = filterByPackagingIdByNotSectionId(catalogue, 1, 5)
  const selectInfo = products.map(({ id, title }) => ({
    value: String(id),
    label: title.split(" - ")[0]
  }));

  return(
    <Drawer
      variant="temporary"
      anchor="right"
      open={openCartDrawer}
      onClose={closeCartDrawer}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box'},
      }}
    >
      <Box sx={{
        position: 'relative', 
        height: '100%', 
        width: "min(100vw, 420px)", 
        padding: "12px", 
        display: "flex",
        flexDirection:"column",
      }}>
        {/* Boton cierre */}
        <Box
          sx={{ position: 'absolute', top: "1rem", right: "1rem", color: greyColor[950] }}
          onClick={closeCartDrawer}
        >
          <CloseIcon />
        </Box>

        {/* Titulo */}
        <Box>
          <Heading2 sx={{marginBottom: "8px"}}>Carrito de compras</Heading2>
          {isAuth && 
          <Box sx={{
            display: "flex", 
            alignItems: "center", 
            gap: "10px", 
            marginBottom: "24px"
          }}>
            <AccountCircleOutlinedIcon sx={{color: greyColor[950]}}/>
            <BodyS>maildeejemplo@gmail.com</BodyS>
          </Box>}
        </Box>
        {!itemsCount &&
          <Heading4>Aún no hay productos cargados al carrito...</Heading4>
        }
        {cart && !!itemsCount &&
        <>
          {/* Productos de carrito */}
          <Box sx={{ overflowY: "auto", overflowX: "hidden"}}>
            {cart.cartItems.map((cartItem, index)=>(
              <CartDrawerItem 
                key={`cartItem-${cartItem.id}`}
                cartItem={cartItem} 
                index={index} 
                closeCartDrawer={closeCartDrawer}
                selectInfo={selectInfo}
              />
            ))}
          </Box>

          {/* Subtotal Carrito */}
          <Box sx={{display: "flex", flexDirection: "column", gap: "16px"}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <Divider sx={{height: "8px", backgroundColor: "secondary.dark", borderRadius: "15px"}} />
              <BodyS sx={{width: "100%", textAlign: "center", color: "secondary.dark"}}>¡Genial! Tenés envío gratis.</BodyS>
            </Box>
            
            <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <Box sx={{display: "flex", alignItems:"center", justifyContent:"space-between" }}>
                <Heading4>Subtotal (con descuentos):</Heading4>
                <Heading4>{numberToPrice(totalWithDiscount)}</Heading4>
              </Box>
              <Box sx={{display: "flex", alignItems:"center", justifyContent:"space-between" }}>
                <Heading4>Envío:</Heading4>
                <Heading4 sx={{color: "secondary.dark"}}>GRATIS</Heading4>
              </Box>
            </Box>  
            <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <Box sx={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                <Heading2>TOTAL:</Heading2>
                <Heading2>{numberToPrice(totalWithDiscount)}</Heading2>
              </Box>
              <Box sx={{display: "flex", alignItems:"center", justifyContent:"end" }}>
                <BodyS sx={{color: "secondary.dark"}}>{`o ${numberToPrice(totalWithDiscount * 0.8)} con Transferencia o depósito`}</BodyS>
              </Box>
              <Box sx={{display: "flex", alignItems:"center", justifyContent:"end" }}>
                <BodyS sx={{color: "secondary.dark"}}>{`o hasta 6 cuotas de ${numberToPrice(totalWithDiscount / 6)} sin interes`}</BodyS>
              </Box>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <ColorButton
              id="bt-cart-drawer-begin"
              type="brownButton"
              onClick={handleStartCheckout}
              text="Iniciar compra"
              fetchingText=""
              isFetching={false}
              disabled={false}
              sx={{width: "100%"}}
              />
              <OnlyTextButton
              id="bt-cart-drawer-keep-shopping"
              onClick={handleKeepShopping}
              text="Ver más productos"
              fetchingText=""
              isFetching={false}
              disabled={false}
              sx={{marginX: "auto", p:{textDecoration: "underline" }}}
              />
            </Box>
          </Box>
        </>}
      </Box>
    </Drawer>
  )
}