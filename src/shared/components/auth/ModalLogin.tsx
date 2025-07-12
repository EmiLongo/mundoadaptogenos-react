
import { Box, IconButton, Modal } from "@mui/material";
import { Login } from "./Login";
import { Heading3 } from "@/theme/textStyles";
import { ForgetPass } from "./ForgetPass";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

type ModalLoginProps = {
  isOpenLogin: boolean;
  handleClose: () => void;
  setIsOpenDrawer?: (isOpen: boolean) => void;
  isOpenForgetPass?: boolean;
  setIsOpenForgetPass?: (isOpen: boolean) => void;
}

export const ModalLogin: React.FC<ModalLoginProps> = ({ 
  isOpenLogin = false, 
  handleClose = () => {}, 
  setIsOpenDrawer = () => {},
  isOpenForgetPass = false,
  setIsOpenForgetPass = () => {}
}) => {
  return (
    <Modal
    open={isOpenLogin}
    onClose={handleClose}
    >
      <Box sx={{ 
        backgroundColor: "background.paper",
        position: "absolute", 
        top: {xs: "200px", sm: "20px", md: "80px", xl:"80px"}, 
        right: {xs: "1.5dvw", sm: "50%", md: "80px", xl:"80px"},
        zIndex: 100,
        width: {xs: "97dvw", sm: "unset"},
        transform: {sm: "translate(50%, 50%)", md: "unset"},
      }}>
        {isOpenForgetPass && 
          <IconButton onClick={() => setIsOpenForgetPass(false)} sx={{ border: "none", position: "absolute", top: "0.6rem", left: "1rem"}}>
            <ArrowBackOutlinedIcon />
          </IconButton>
        }
        <Heading3 sx={{
          margin: "1rem auto 0",
          textAlign: "center",

        }}>
          {isOpenForgetPass ? "Recuperar contraseña" : "Iniciar sesión"}
        </Heading3>  
        {!isOpenForgetPass
        ? <Login handleClose={handleClose} isModal={true} setIsOpenDrawer={setIsOpenDrawer} setIsOpenForgetPass={setIsOpenForgetPass} />
        : <ForgetPass handleClose={handleClose} isModal={isOpenForgetPass} setIsOpenDrawer={setIsOpenDrawer} />}
      </Box>
   </Modal>
  );
}