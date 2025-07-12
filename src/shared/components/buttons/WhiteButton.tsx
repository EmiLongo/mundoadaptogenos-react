// src/shared/components/buttons/WhiteButton.tsx
import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import { greyColor } from "@/theme/theme";
import { ButtonM } from "@/theme/textStyles";

interface IWhiteButtonProps {
  id: string;
  onClick: () => void;
  text?: string;
  fetchingText?: string;
  isFetching: boolean;
  disabled: boolean;
  sx?: object;
  icon?: React.ReactNode;
}

export const WhiteButton: React.FC<IWhiteButtonProps> = ({
  id,
  onClick = () => {},
  text = "",
  fetchingText = "",
  isFetching = false,
  disabled = false,
  sx = {},
  icon = null,
}) => {
  return (
    <Button
      id={id}
      variant="contained"
      size="small"
      onClick={onClick}
      disabled={disabled || isFetching}
      sx={{
        minWidth: (fetchingText !== "" || text !== "") ? "60px" : "40px",
        width: (fetchingText !== "" || text !== "") ? "unset" : "40px",
        height: "40px",
				display: "flex",
				alignItems: "center",
        color: greyColor[950],
        backgroundColor: greyColor[50],
				border: `1px solid ${greyColor[950]}`,
        borderRadius: "30px",
        boxShadow: "none",
				// boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "&:hover":{
          backgroundColor: greyColor[300],
          boxShadow: "none",
        },
        ...sx,
      }}
    >
      {icon && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: (fetchingText !== "" || text !== "") ? "0.5rem" : "0",
          }}
        >
          {icon}
        </Box>
      )}
      {(fetchingText !== "" || text !== "") && 
      <ButtonM>
        {isFetching && fetchingText ? fetchingText : text }
      </ButtonM>}
      {isFetching && <CircularProgress size={20} sx={{ color: "inherit" }} />}
    </Button>
  )
}