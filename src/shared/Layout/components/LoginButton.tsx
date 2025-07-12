// src/shared/Layout/components/LoginButton.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { ModalLogin } from "@shared/components/auth/ModalLogin";
import { WhiteButton } from "@shared/components/buttons/WhiteButton";

export const LoginButton: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenForgetPass, setIsOpenForgetPass] = useState(false);
  // TODO: hacer la logica para verificar si el usuario esta logueado
  const isUserLoggedIn = false;

  const handleCloseLogin = () => {
    setIsOpenLogin(false);
    setIsOpenForgetPass(false);
  }

  return (
    isUserLoggedIn ? 
    <IconButton onClick={() => navigate("/profile")}>
      <PersonOutlineOutlinedIcon />
    </IconButton>
    :
    <>
    <WhiteButton
    id="login-button"
    onClick={() => setIsOpenLogin(true)}
    sx={{ width: "135px" }}
    text="INICIAR SESIÓN"
    fetchingText=""
    isFetching={false}
    disabled={false}
    />

    <ModalLogin 
      isOpenLogin={isOpenLogin} 
      handleClose={() => handleCloseLogin()} 
      setIsOpenForgetPass={setIsOpenForgetPass}
      isOpenForgetPass={isOpenForgetPass}
    />
    </>
  );
};
