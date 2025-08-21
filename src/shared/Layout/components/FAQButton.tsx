// src\shared\Layout\components\FAQButton.tsx
import React from "react";
import { IconButton } from "@mui/material";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useNavigate } from "react-router-dom";


export const FAQButton: React.FC = () => {
  const navigate = useNavigate();
  const handleFAQButton = () => {
    navigate("./faq")
  }

  return (
    <IconButton 
        id="bti-faq-desktop"
        onClick={handleFAQButton} 
        sx={{border:"none"}}
      >
          <HelpOutlineOutlinedIcon sx={{
            color: "greyColor[950]", 
            "&:hover":{ color: {xs: "primary.main", md: "unset"}}}
          }/>
      </IconButton>
  )
}