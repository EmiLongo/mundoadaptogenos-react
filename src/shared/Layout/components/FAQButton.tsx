// src/shared/cart/CartButton.tsx
import React from "react";
import { greyColor } from "@theme/theme";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useNavigate } from "react-router-dom";


export const FAQButton: React.FC = () => {
  const navigate = useNavigate();
  const handleFAQButton = () => {
    navigate("./faq")
  }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
  <>
    {isMobile
    ? <IconButton 
        id="bti-faq-mobile"
        onClick={handleFAQButton} 
        color="secondary"
      >
          <HelpOutlineOutlinedIcon />
      </IconButton>
    : <IconButton 
        id="bti-faq-desktop"
        onClick={handleFAQButton} 
        sx={{border: {xs: "none", md:`1px solid ${greyColor[950]}`,} }}
      >
          <HelpOutlineOutlinedIcon sx={{
            color: "greyColor[950]", 
            "&:hover":{ color: {xs: "primary.main", md: "unset"}}}
          }/>
      </IconButton>

    }
  </>
  )
}