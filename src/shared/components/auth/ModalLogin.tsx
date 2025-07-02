
import { Box, Modal } from "@mui/material";
import { Login } from "./Login";
import { Title3 } from "@/theme/textStyles";

type ModalLoginProps = {
  isOpenLogin: boolean;
  handleClose: () => void;
  setIsOpenDrawer?: (isOpen: boolean) => void;
}

export const ModalLogin: React.FC<ModalLoginProps> = ({ isOpenLogin = false, handleClose = () => {}, setIsOpenDrawer = () => {} }) => {
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
        <Title3 sx={{
          margin: "1rem auto 0",
          textAlign: "center",

        }}>
          Iniciar sesión
        </Title3>  
        <Login handleClose={handleClose} isModal={true} setIsOpenDrawer={setIsOpenDrawer}/>
      </Box>
   </Modal>
  );
}