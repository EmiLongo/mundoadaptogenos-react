import React from "react";
import { InputField } from "@theme/textStyles";
import { Box, IconButton } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { greyColor } from "@theme/theme";
import { useCart } from "@/store/useCartStore";

interface IProductCounter {
  index: number;
  counter: number;
  handleAdd: ()=>void;
  handleSus: ()=>void;
}
export const ProductCounter: React.FC<IProductCounter> = ({index, counter, handleAdd, handleSus}) => {
  const { isLoading } = useCart()
  const iconBtStyles: object = {
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center",
    width:"30px", 
    height:"30px",
    border: "none",
  }

  return (
    <Box
      key={`product-counter-${index}`}
      sx={{
        height: "40px", 
        width: "120px", 
        display: "flex", 
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "30px",
        border: `1px ${greyColor[950]} solid`
      }}
    >
      <IconButton sx={{...iconBtStyles}}
      onClick={handleSus}
      disabled={isLoading}
      >
        <RemoveOutlinedIcon width={20} sx={{color: greyColor[950]}} />
      </IconButton>
      <InputField sx={{width: "20px", textAlign: "center"}}>{counter}</InputField>
      <IconButton sx={{...iconBtStyles}}
      onClick={handleAdd}
      disabled={isLoading}
      >
        <AddOutlinedIcon width={20} sx={{color: greyColor[950]}} />
      </IconButton>
    </Box>
  )
}