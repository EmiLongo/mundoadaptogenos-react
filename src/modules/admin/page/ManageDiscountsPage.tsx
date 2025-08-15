// src/modules/admin/page/ManageDiscountsPage.tsx
import { HeadingPage } from "@/shared/components/HeadingPage";
import { Heading3, Heading4 } from "@/theme/textStyles";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react"
import { DiscountsForm } from "../components/DiscountsForm";

export const ManageDiscountsPage: React.FC = () => {
  const theme = useTheme();
  const isMoble = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{
      paddingRight: {xs: "1rem", sm:"2rem", md:"4rem", lg:"5rem", xl:"8rem"},
      paddingLeft: {xs: "1rem", sm:"2rem", xl:"3rem"},
      paddingTop: {xs: "24px", md:"48px"},
      paddingBottom: {xs: "3rem", md:"3rem"},
    }}>
      <HeadingPage text="Menu Administrador para gestión de Descuentos" />
      {isMoble 
        ? <Heading4 sx={{textAlign: "center", marginBottom: "16px"}}>DESCUENTOS</Heading4>
        : <Heading3 sx={{textAlign: "center", marginBottom: "16px"}}>DESCUENTOS</Heading3>
      }
      <DiscountsForm />
    </Box>
  )
}