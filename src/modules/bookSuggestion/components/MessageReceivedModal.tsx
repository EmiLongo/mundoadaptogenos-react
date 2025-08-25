// src/modules/bookSuggestion/components/MessageReceivedModal.tsx
import { Closebutton } from "@/shared/components/buttons/Closebutton";
import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton";
import { BodyM, Heading5 } from "@/theme/textStyles";
import { greyColor, paddingModal } from "@/theme/theme";
import { Box, Modal } from "@mui/material";
import React from "react";

interface IMessageReceivedModal {
  isOpen: boolean,
  onClose: () => void
}
export const MessageReceivedModal: React.FC<IMessageReceivedModal> = ({isOpen, onClose}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "345px",

        borderRadius: "8px",
        border: `2px solid ${greyColor[950]}`,
        backgroundColor: greyColor[50],
        color: greyColor[950],
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        ...paddingModal
      }}>
        <Closebutton closeModal={onClose} id="bti-suggestion-closeModal"/>
        <Heading5 sx={{textAlign: "center", paddingX: "3rem"}}>Su mensaje fue enviado con éxito!</Heading5>
        <BodyM sx={{textAlign: "center", paddingX: "1.5rem"}}>Te vamos a estar enviando la constancia de recepción del mensaje al mail ingresado.</BodyM>
        <OnlyTextButton
          id="bti-suggestion-modal-closeModal"
          text="Cerrar" 
          onClick={onClose} 
          isFetching={false}
          disabled={false}
          isUnderline={false}
          size="L"
          sx={{alignSelf: "center"}}
        />
      </Box>
    </Modal>
  )
}