// src/modules/admin/components/ProductCardNew.tsx
import React from "react";
import { Box, Card, Divider } from "@mui/material";
import { BodyMEmph, BodyS, Caption } from "@/theme/textStyles";
import { greyColor } from "@/theme/theme";
import { useNavigate } from "react-router-dom";
import { SwitchCustom } from "./SwitchCustom";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';


export const ProductCardNew: React.FC = () => {
  const navigate = useNavigate();
  const handleCard = () => {
    navigate("/admin/create-products", { state: { product: null } });
  };

  return (
    <Card
      elevation={3}
      sx={{
        minWidth: "167px",
        width: "167px",
        height: "344px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleCard}
    >
      {/* imagen */}
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: greyColor[400],
        }}
      >
        <InsertPhotoOutlinedIcon sx={{fontSize: "40px", color: greyColor[800]}} />
      </Box>

      {/* parte de abajo */}
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1rem",
          gap: "8px",
          backgroundColor: greyColor[50],
        }}
      >
        <BodyS
          sx={{
            width: "100%",
            textAlign: "left",
            height: "40px",
          }}
        >
          Título de producto
        </BodyS>
        <BodyMEmph>$0</BodyMEmph>
        <Divider color={greyColor[400]}/>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap:"8px"}}>
            <Caption>Código</Caption>
            {/* en el futuro tendra que ser product.code */}
            <BodyS>0000</BodyS> 
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap:"8px"}}>
            <Caption>Activo</Caption>
            <SwitchCustom
              checked={false}
            />      
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
