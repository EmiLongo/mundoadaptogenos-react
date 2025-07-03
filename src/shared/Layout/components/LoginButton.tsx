import React, { useState } from "react";
import { TextBox } from "@/theme/textStyles";
import { greyColor } from "@/theme/theme";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { ModalLogin } from "@/shared/components/auth/ModalLogin";

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
    <IconButton onClick={() => setIsOpenLogin(true)} sx={{ width: "100px" }}>
      <TextBox sx={{ color: greyColor[600] }}>Iniciar sesión</TextBox>
    </IconButton>
    <ModalLogin 
      isOpenLogin={isOpenLogin} 
      handleClose={() => handleCloseLogin()} 
      setIsOpenForgetPass={setIsOpenForgetPass}
      isOpenForgetPass={isOpenForgetPass}
    />
    </>
  );
};
