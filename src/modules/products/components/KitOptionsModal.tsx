import React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import { BodyM } from "@theme/textStyles";
import { greyColor } from "@theme/theme";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface IKitOptionsModal {
  isOpen: boolean;
  onClose: () => void;
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
}

export const KitOptionsModal: React.FC<IKitOptionsModal> = ({ isOpen, onClose, selectedOptions, setSelectedOptions }) => {
  setSelectedOptions(["estrellita", "culona"])
  console.log(selectedOptions)
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{
        gap: "16px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "345px",
        maxWidth: "375px",
        padding: "36px 24px 12px 24px",
        borderRadius: "8px",
        border: `2px solid ${greyColor[950]}`,
        backgroundColor: greyColor[50],
      }}>
        <Box sx={{        
          display: "flex", 
          flexDirection: "column",
          position: "relative",
        }}>
          <IconButton sx={{
            position: "absolute", 
            top: "-24px", 
            right: "-12px",
            color: greyColor[950],
            border: "none",
            "&:hover": {
              backgroundColor: "transparent",
              color: "secondary.dark",
              border: "none",
            },
          }}>
            <CloseOutlinedIcon sx={{cursor: "pointer", color: greyColor[950]}} onClick={onClose} />
          </IconButton>
        </Box>
        <BodyM sx={{textAlign: "center", width: "100%"}}>Elegí las tres opciones de variantes:</BodyM>
        <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>

        </Box>
        <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>

        </Box>
        <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>

        </Box>
      </Box>
    </Modal>
  )
}