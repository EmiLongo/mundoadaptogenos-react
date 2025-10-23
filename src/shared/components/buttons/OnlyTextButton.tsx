// src/shared/components/buttons/OnlyTextButton.jsx
import {
  Box,
  Button,
  CircularProgress,
  SxProps,
} from "@mui/material";
import { greyColor, brownColor } from "@theme/theme";
import { ButtonL, ButtonM, ButtonS } from "@theme/textStyles";
import { Theme } from "@mui/material";

type OnlyTextButtonProps = {
  id: string;
  type?: "greyButton" | "primaryButton" | "primaryLigthButton"; 
  size?: "S" | "M" | "L";
  onClick: () => void;
  text: string;
  fetchingText?: string;
  isFetching: boolean;
  icon?: React.ReactNode;
  isLowerCase?: boolean;
  isUnderline?: boolean;
  disabled: boolean;
  sx?: SxProps<Theme>;
};

export const OnlyTextButton: React.FC<OnlyTextButtonProps> = ({
  id,
  onClick = () => {},
	type = "primaryButton",
  size = "S",
  text = "",
  icon = null,
  fetchingText = "",
  isFetching = false,
  isLowerCase = false,
  isUnderline = true,
  disabled = false,
  sx = {},
}) => {

  return (
    <Button
      id={id}
      variant="contained"
      size="small"
      onClick={onClick}
      disabled={disabled || isFetching}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        boxShadow: "none",
        color: type === "primaryButton" ? "primary.dark" : type === "primaryLigthButton" ? brownColor[200] : greyColor[950],
        backgroundColor: "transparent",
        padding: 0,
        textDecoration: isUnderline ? "underline" : "none",
        "&:hover": {
          boxShadow: "none",
          color: type === "primaryButton" ? "primary.main" : type === "primaryLigthButton" ? brownColor[400] : brownColor[700],
          fontWeight: 800,
          textDecoration: isUnderline ? "underline" : "none",
        },
        ...sx,
      }}
    >
      {icon && (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
          {icon}
        </Box>
      )}

      {size === "S" && 
        <ButtonS sx={{color: "inherit", fontWeight: "inherit", textDecoration: "inherit", textTransform: isLowerCase ? "none" : "uppercase"}}>
          {isFetching && fetchingText ? fetchingText : text}
        </ButtonS>
      }
      {size === "M" && 
        <ButtonM sx={{color: "inherit", fontWeight: "inherit", textDecoration: "inherit", textTransform: isLowerCase ? "none" : "uppercase"}}>
          {isFetching && fetchingText ? fetchingText : text}
        </ButtonM>
      }
      {size === "L" && 
        <ButtonL sx={{color: "inherit", fontWeight: "inherit", textDecoration: "inherit", textTransform: isLowerCase ? "none" : "uppercase"}}>
          {isFetching && fetchingText ? fetchingText : text}
        </ButtonL>
      }
      {isFetching && <CircularProgress size={20} sx={{ color: "inherit" }} />}
    </Button>
  );
};
