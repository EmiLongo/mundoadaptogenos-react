// src/shared/Layout/components/LoginButton.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, useMediaQuery } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { ModalLogin } from "@shared/components/auth/ModalLogin";
import { WhiteButton } from "@shared/components/buttons/WhiteButton";
import { useUserStore } from "@store/useUserStore";
import { useTheme } from "@mui/material";
import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton";
import { Role } from "@/types/AuthTypes";

export const LoginButton: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenForgetPass, setIsOpenForgetPass] = useState(false);
  const user = useUserStore(state => state.user);

  const handleCloseLogin = () => {
    setIsOpenLogin(false);
    setIsOpenForgetPass(false);
  }

  return (
    <>
    {(!!user && !isMobile) 
    ? user.role === Role.ADMIN
      ? <IconButton
          id="bti-menu-profile"
          onClick={() => navigate("/admin/")}
        >
          <AdminPanelSettingsOutlinedIcon />
        </IconButton>
      : <IconButton
          id="bti-menu-profile"
          onClick={() => navigate("/profile")}
        >
          <PersonOutlineOutlinedIcon />
        </IconButton>
    :
    <>
    {isMobile 
    ? <OnlyTextButton
    id="login-button"
    type= "greyButton"
    onClick={() => setIsOpenLogin(true)}
    size="M"
    isUnderline={false}
    text="INICIAR SESIÓN"
    fetchingText=""
    isFetching={false}
    disabled={false}
    />
    : <WhiteButton
    id="login-button"
    onClick={() => setIsOpenLogin(true)}
    sx={{ width: "135px" }}
    text="INICIAR SESIÓN"
    fetchingText=""
    isFetching={false}
    disabled={false}
    />}

    <ModalLogin 
      isOpenLogin={isOpenLogin} 
      handleClose={() => handleCloseLogin()} 
      setIsOpenForgetPass={setIsOpenForgetPass}
      isOpenForgetPass={isOpenForgetPass}
    />
    </>}
    </>
  );
};
