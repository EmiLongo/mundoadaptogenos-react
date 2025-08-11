
import { Box, IconButton, keyframes, Modal } from "@mui/material";
import { Login } from "./Login";
import { Heading3 } from "@/theme/textStyles";
import { ForgetPass } from "./ForgetPass";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Closebutton } from "../buttons/Closebutton";
import { heightForModals } from "@/shared/Layout/utils/info";
import { greyColor, paddingModal } from "@/theme/theme";

// Animación para el texto
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

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
        top: {xs: "200px", md: heightForModals}, 
        right: {xs: "1rem", sm:"2rem", md:"4rem", lg:"5rem", xl:"8rem"},
        width: {xs: "97dvw", sm: "344px"},
        border: `1px solid ${greyColor[950]}`,
        borderRadius: "8px",
        transform: {xs: "translate(50%, 50%)", md: "unset"},
        zIndex: 100,
        ...paddingModal
      }}>
        <Closebutton closeModal={()=>handleClose()} id="bti-close-modal-login" />
        {isOpenForgetPass && 
          <IconButton
            id="bti-back-to-login"
            onClick={() => setIsOpenForgetPass(false)} 
            sx={{ border: "none", position: "absolute", top: "4px", left: "4px"}}
          >
            <ArrowBackOutlinedIcon />
          </IconButton>
        }
        <Heading3 sx={{
          margin: "1rem auto 24px",
          textAlign: "center",
        }}>
          {isOpenForgetPass ? "RECUPERAR CONTRASEÑA" : "INICIAR SESIÓN"}
        </Heading3>  
        {!isOpenForgetPass
        ? <Login handleClose={handleClose} isModal={true} setIsOpenDrawer={setIsOpenDrawer} setIsOpenForgetPass={setIsOpenForgetPass} sx={{animation: `0.6s ${fadeInAnimation} ease-out`}} />
        : <ForgetPass handleClose={handleClose} isModal={isOpenForgetPass} setIsOpenDrawer={setIsOpenDrawer} setIsOpenForgetPass={setIsOpenForgetPass} sx={{animation: `0.6s ${fadeInAnimation} ease-out`}} />}
      </Box>
   </Modal>
  );
}