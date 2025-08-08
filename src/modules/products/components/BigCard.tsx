// src\modules\products\components\BigCard.tsx
import React, { useRef, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BodyM, BodyS, Caption, Heading2, Heading3 } from "@theme/textStyles";
import { greenColor, greyColor, paddingPage } from "@theme/theme";
import { IProduct } from "@/shared/types/ProductTypes";
import { numberToPrice } from "@shared/utils/convertNumberToPrice";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton";
import { ColorButton } from "@/shared/components/buttons/ColorButton";
import { ProductCounter } from "@/shared/cart/ProductCounter";
import { useCart } from "@/store/useCartStore";
import { toast } from "react-toastify";
import { WhiteButton } from "@/shared/components/buttons/WhiteButton";
import { KitOptionsModal } from "./KitOptionsModal";
import { filterByPackagingIdByNotSectionId } from "@/shared/Layout/utils/filterProducts";
import { catalogue } from "@/shared/Layout/utils/catalogue";
import { useCartDrawer } from "@/store/useCartDrawer";
import { OptionsModal } from "./OptionsModal";

interface IBigCard {
  product: IProduct
}
export enum ClickFrom {
  ADD_TO_CART = "addToCart",
  SELECT_OPTIONS = "selectOptions",
  LARGE_SCREEN = "largeScreen",
}
export const BigCard: React.FC<IBigCard> = ({ product }) => {
  const { addProduct, isProductInCart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const { toggleCartDrawer } = useCartDrawer();

  const sectionsProduct = product.sectionId;
  const [counter, setCounter] = useState<number>(1);
  const [isKitOptionsModalOpen, setIsKitOptionsModalOpen] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["","",""]);

  const formikValidateRef = useRef<(() => Promise<any>) | null>(null);
  const formikResetRef = useRef<(() => void) | null>(null);

  const handleShowDetails = () => {
    console.log("handleShowDetails")
  }
  
  const products = filterByPackagingIdByNotSectionId(catalogue, 1, 5)
  const selectInfo = products.map(({ id, title }) => ({
    value: String(id),
    label: title.split(" - ")[0]
  }));

  const handleAddToCart = async() => {
    // si tiene opciones
    if(sectionsProduct.length > 1){
      // se fija que esten todos completos sino abre modal
      if(selectedOptions.some((option) => option === "")){
        if(isLargeScreen){
          if (formikValidateRef.current) {
            const errors = await formikValidateRef.current();
            if (Object.keys(errors).length > 0) {
              toast.error("Se deben elegir todas las opciones");
              return;
            }
          }
        } else {
          setIsKitOptionsModalOpen(ClickFrom.ADD_TO_CART)
        }
      } else {
        const success = await addProduct(product, counter, selectedOptions);
        if (success) {
          setSelectedOptions(["", "", ""]);
          if (formikResetRef.current) formikResetRef.current();
        }
      }
    } else {
      addProduct(product, counter, selectedOptions);
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Mundo Adaptógenos - ${product.title}`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success("¡URL copiada al portapapeles!"))
        .catch(() => toast.error("No se pudo copiar la URL"));
    }
  };

  const handleOpenOptionsModal = () => {
    setIsKitOptionsModalOpen(ClickFrom.SELECT_OPTIONS);
  }
  

  const handleAdd = () => {
    const quantity = counter+1;
    setCounter(quantity);
  }
  const handleSus = () => {
    if(counter === 1) return
    const quantity = counter-1;
    setCounter(quantity);
  }

  return (
    <Box sx={{
      ...paddingPage
    }}>
      <BodyS sx={{marginY: "24px"}}>Inicio / Comprar / {product.title}</BodyS>
      <Box sx={{display: "flex", flexDirection: {xs: "column", md: "row"}, gap: "32px"}}>
        {/* primera columna */}
        <Box sx={{flex: 1, position: "relative", display: "flex", flexDirection: "column", gap: "8px"}}>
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
          <OnlyTextButton 
            id= "bt-shop-share-product"
            type= "primaryButton"
            onClick= {handleShare}
            text= "Compartir"
            isFetching= {false}
            icon= {<ShareOutlinedIcon />}
            disabled= {false}
          />
        </Box>

        {/* segunda columna */}
        <Box sx={{flex: 1, display: "flex", flexDirection: "column", gap: "16px"}}>
          {isMobile
            ? <Heading3 >{product.title}</Heading3>
            : <Heading2 >{product.title}</Heading2>}
          <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
            <Box sx={{ display: "flex", alignItems: "center", gap: {xs: "16px", sm: "32px"} }}>
              <Heading3 sx={{ color: greenColor[900],}}>{numberToPrice(product.priceDiscount)}</Heading3>
              <BodyS sx={{ color: greyColor[700], textDecoration: "line-through" }}>
                {numberToPrice(product.price)}
              </BodyS>
            </Box>
            <BodyS sx={{ color: greyColor[700]}}>
              {numberToPrice(product.price * 0.79)} sin impuestos
            </BodyS>
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", gap: "8px", color: greyColor[950]}}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px",}}>
              <PaymentsOutlinedIcon />
              <BodyS sx={{textWrap: "wrap"}}>
                {numberToPrice(product.priceTransfer)} con Transferencia o Depósito 
              </BodyS>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px",}}>
              <CreditCardOutlinedIcon />
              <BodyS sx={{textWrap: "wrap"}}>
                {product.plan}
              </BodyS>
            </Box>
            <OnlyTextButton
              id="bt-shop-show-details"
              onClick={handleShowDetails}
              text="Ver más detalles"
              fetchingText=""
              isFetching={false}
              disabled={false}
              />
          </Box>
          {isLargeScreen && sectionsProduct.length > 1 && 
          <OptionsModal 
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            selectInfo={selectInfo}
            exposeValidation={(validateFn) => {
              formikValidateRef.current = validateFn;
            }}
            exposeReset={(resetFn) => {
              formikResetRef.current = resetFn;
            }}
          />
          }
          <Box sx={{
            width: {xs: "100%", sm: "265px", lg: "350px"},
            display: "flex",
            flexDirection: sectionsProduct.length > 1 ? "column" : "row",
            gap: "12px"
          }}>
            {sectionsProduct.length > 1 &&
              <Box>
                {selectedOptions[0] !== "" && 
                  (() => {
                    const found = selectInfo.find(info => info.value === selectedOptions[0]);
                    return found && <BodyS>1 x {found.label}</BodyS>;
                  })()
                }
                {selectedOptions[1] !== "" && 
                  (() => {
                    const found = selectInfo.find(info => info.value === selectedOptions[1]);
                    return found && <BodyS>1 x {found.label}</BodyS>;
                  })()
                }
                {selectedOptions[2] !== "" && 
                  (() => {
                    const found = selectInfo.find(info => info.value === selectedOptions[2]);
                    return found && <BodyS>1 x {found.label}</BodyS>;
                  })()
                }
              </Box>
            }
            <Box sx={{display: "flex", gap: "8px"}}>
              <>
              {sectionsProduct.length === 1 &&
              <ProductCounter 
              index={999999}
              counter={counter} 
              handleAdd={handleAdd}
              handleSus={handleSus}
              isDelete={false}
              type="primary"
              />}
              {sectionsProduct.length > 1 && !isLargeScreen &&
              <WhiteButton
              id="bt-shop-edit-options"
              onClick = {handleOpenOptionsModal}
              type= {selectedOptions.some(option => option !== "") ? "grey" : "red"}
              text = {selectedOptions.some(option => option !== "") ? "EDITAR OPCIONES" : "ELEGIR OPCIONES"}
              fetchingText = ""
              isFetching = {false}
              disabled = {false}
              sx={(sectionsProduct.length > 1 ? {flex: 1} : {})}
              />}
              </>
            </Box>
            <ColorButton
              id={`bt-shop-add-cart`}
              type="brownButton"
              text="AÑADIR AL CARRITO"
              fetchingText="AÑADIENDO..."
              onClick={handleAddToCart}
              isFetching={false}
              disabled={false}
              sx={{ borderRadius: "30px", width: "100%"}}
            />
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", gap: "8px", color: greyColor[950]}}>
            {isProductInCart(product.id) && <Box sx={{display:"flex", alignItems: "center", gap:"8px", marginBottom: "1.5rem"}}>
              <DoneAllIcon />
              <BodyM sx={{textWrap: "wrap"}}>
              Ya agregaste este producto al carrito.
              </BodyM>
              <OnlyTextButton 
                id= "bt-product-open-cart-drawer"
                type= "greyButton"
                size= "M"
                onClick= {toggleCartDrawer}
                text= "Ver Carrito"
                isFetching= {false}
                disabled= {false}
              />
            </Box>}
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px",}}>
              <LocalShippingOutlinedIcon />
              <BodyM sx={{textWrap: "wrap"}}>
              Medios de envío
              </BodyM>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px",}}>
              <BodyS sx={{color: greenColor[900]}}>
              ENVÍO GRATIS
              </BodyS>
              <BodyS sx={{textWrap: "wrap"}}>
              (en toda la Argentina)
              </BodyS>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px"}}>
              <StoreMallDirectoryOutlinedIcon />
              <BodyM sx={{textWrap: "wrap"}}>
              Punto de retiro
              </BodyM>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column",}}>
              <BodyS sx={{textWrap: "wrap"}}>
              Sadi Carnot 5952, Rosario.
              </BodyS>
              <BodyS sx={{textWrap: "wrap"}}>
              Santa Fe, Argentina. CP 2000
              </BodyS>
            </Box>
          </Box>
        </Box>
      </Box>
      <KitOptionsModal
        isOpen={isKitOptionsModalOpen !== null} 
        onClose={() => setIsKitOptionsModalOpen(null)}
        clickFrom={isKitOptionsModalOpen as ClickFrom}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        selectInfo={selectInfo}
      />
    </Box>
  )
}