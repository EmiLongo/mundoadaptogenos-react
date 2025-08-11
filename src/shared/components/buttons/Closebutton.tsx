import React from "react"
import { IconButton } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { greyColor } from "@/theme/theme";

interface ICloseButton {
  closeModal: () => void;
  id: string;
  sx?: object;
}
export const Closebutton: React.FC<ICloseButton> = ({closeModal, id, sx}) => {
  return (
    <IconButton 
    id={id}
    sx={{
      position: "absolute", 
      top: "4px", 
      right: "4px",
      color: greyColor[950],
      border: "none",
      "&:hover": {
        backgroundColor: "transparent",
        color: "secondary.dark",
        border: "none",
      },
      ...sx,
    }}
    >
      <CloseOutlinedIcon sx={{cursor: "pointer", color: greyColor[950]}} onClick={closeModal} />
    </IconButton>

  )
}
