// src/shared/components/ColorButton.jsx
import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { greyColor, primaryColor, secondaryColor } from "@/theme/theme";

type ColorButtonProps = {
  type: "greenButton" | "blueButton";
  onClick: () => void;
  text: string;
  fetchingText?: string;
  isFetching: boolean;
  disabled: boolean;
  sx?: object;
};

export const ColorButton: React.FC<ColorButtonProps> = ({
  type = "blueButton", //lightGreenButton, greenButton, yellowButton, brownButton
  onClick = () => {},
  text = "",
  fetchingText = "",
  isFetching = false,
  disabled = false,
  sx = {},
}) => {
  return (
    <Button
    onClick={onClick}
    disabled={disabled || isFetching}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      height: "40px",
      minWidth: "120px",
      borderRadius: "40px",
      backgroundColor: type === "blueButton" ? primaryColor[600] : secondaryColor[400],

      ...sx,
    }}
  >
      <span>{isFetching && fetchingText ? fetchingText : text }</span>
      {isFetching && <CircularProgress size={20} sx={{ color: greyColor[950] }} />}
    </Button>
  );
};
