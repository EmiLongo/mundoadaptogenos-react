// src/modules/mushroom-type/page/MushroomTypePage.tsx
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material"
import React, { useEffect } from "react"
import { IMushroomDetails } from "@/types/MushroomTypes"
import { Benefits } from "../components/Benefits";
import { Bioactive } from "../components/Bioactive";
import { MushroomTitle } from "../components/MushroomTitle";
import { GeneralInfo } from "../components/GeneralInfo";
import { HealthEffectsMobile } from "../components/HealthEffectsMobile";
import { HealthEffectsDesktop } from "../components/HealthEffectsDesktop";
import { Carousel } from "@/modules/home/components/Carousel";
import { ContainerHorizontalCards } from "@/shared/cart/ContainerHorizontalCards";
import { useProductsStore } from "@/store/useProductsStore";

interface IMushroomTypePage {
  mushroom: IMushroomDetails;
}
export const MushroomTypePage: React.FC<IMushroomTypePage> = ({ mushroom }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  // filtrar los productos que pertenezcan a las secciones del hongo
  const { products, isLoading, fetchProducts, filterBySectionSlug } = useProductsStore();
  const filteredCatalogue = filterBySectionSlug(mushroom.productSectionSlug);

  // Cargar productos al montar el componente
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  return (
    <Box component="main" sx={{width: "100%"}}>
      <Box component="h1" sx={{color:"transparent", position:"absolute", zIndex: -1}}>Encontrá la información de tu hongo adaptógeno favorito. Melena de León, Reishi, Cordyceps Militaris, Cola de Pavo</Box>
      {/* titulo */}
      <MushroomTitle mushroom={mushroom} isMobile={isMobile} isLargeScreen={isLargeScreen} />

      {/* Beneficios */}
      <Benefits benefits={mushroom.benefits} isMobile={isMobile} />

      {/* Productos */}
      <Box sx={{paddingY: "40px"}}>
      {isLoading 
      ? <CircularProgress />
      : isMobile
          ? <Carousel catalogue={filteredCatalogue} />
          : <ContainerHorizontalCards catalogue={filteredCatalogue} />
      }
      </Box>

      {/* Bioactivos y efectos en la salud*/}
      <Bioactive bioactive={mushroom.bioactive} isMobile={isMobile} />
      {isMobile
        ? <HealthEffectsMobile mushroom={mushroom} />
        : <HealthEffectsDesktop mushroom={mushroom} />
      }

      {/* Informacion Gral */}
      <GeneralInfo mushroom={mushroom} isMobile={isMobile} />
    </Box>
  )
}