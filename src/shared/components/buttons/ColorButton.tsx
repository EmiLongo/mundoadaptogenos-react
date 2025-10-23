// src/shared/components/ColorButton.jsx
import React from "react";
import { Button, CircularProgress, SxProps } from "@mui/material";
import { greyColor, brownColor, greenColor, redColor } from "@theme/theme";
import { Theme } from "@mui/material";

type ColorButtonProps = {
  id: string
  type?: "greenButton" | "brownButton" | "redButton";
  onClick: () => void;
  text: string;
  fetchingText?: string;
  isFetching: boolean;
  disabled: boolean;
  sx?: SxProps<Theme>;
};

export const ColorButton: React.FC<ColorButtonProps> = ({
  id,
  type = "brownButton",
  onClick = () => {},
  text = "",
  fetchingText = "",
  isFetching = false,
  disabled = false,
  sx = {},
}) => {
  return (
    <Button id={id}
    onClick={onClick}
    disabled={disabled || isFetching}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      height: "40px",
      minWidth: "120px",
      borderRadius: "40px",
      backgroundColor: type === "brownButton" ? brownColor[800] : type === "redButton" ? redColor[400] : greenColor[400],

      ...sx,
    }}
  >
      <span>{isFetching && !!fetchingText ? fetchingText : text }</span>
      {isFetching && <CircularProgress size={20} sx={{ color: greyColor[950] }} />}
    </Button>
  );
};
