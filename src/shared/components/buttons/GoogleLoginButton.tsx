import React from "react"
import { WhiteButton } from "./WhiteButton";
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from "@/shared/hooks/api/auth/useAuth";
import { SxProps, Theme } from "@mui/material";


interface IGoogleLoginButton {
  isFetching?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}
export const GoogleLoginButton: React.FC<IGoogleLoginButton> = ({isFetching = false, disabled = false, sx = {}}) => {
  const { signInWithGoogle } = useAuth();

  return (
    <WhiteButton
      id="bt-header-login-google"
      text="iniciar con google"
      isFetching={isFetching}
      disabled={disabled}
      icon={<GoogleIcon />}
      onClick={() => signInWithGoogle()}
      sx={{ ...sx }}
    />

  )
}