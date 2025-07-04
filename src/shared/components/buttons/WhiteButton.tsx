// src/shared/components/buttons/WhiteButton.tsx
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { greyColor } from "@/theme/theme";

interface IWhiteButtonProps {
  onClick: () => void;
  text?: string;
  fetchingText?: string;
  isFetching: boolean;
  disabled: boolean;
  sx?: object;
  icon?: React.ReactNode;
}

export const WhiteButton: React.FC<IWhiteButtonProps> = ({
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
      variant="contained"
      size="small"
      onClick={onClick}
      disabled={disabled || isFetching}
      sx={{
        minWidth: (fetchingText !== "" || text !== "") ? "60px" : "30px",
        width: (fetchingText !== "" || text !== "") ? "unset" : "30px",
				display: "flex",
				alignItems: "center",
        color: greyColor[900],
        backgroundColor: greyColor[50],
				border: `1px solid ${greyColor[900]}`,
        borderRadius: "4px",
				boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
      <Typography sx={{fontSize: { xs: "0.8rem", sm: "0.9rem" },}}>
        {isFetching && fetchingText ? fetchingText : text }
      </Typography>}
      {isFetching && <CircularProgress size={20} sx={{ color: "inherit" }} />}
    </Button>
  )
}