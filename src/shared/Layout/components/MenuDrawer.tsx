// src/shared/Layout/components/MenuDrawer.tsx
import React, { useState } from "react"
import { Box, Collapse, List } from "@mui/material"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import logoTextHorizontal from '@img/logo-nombre-horizontal.svg';

import { greyColor, redColor } from "@theme/theme";
import { Heading5 } from "@theme/textStyles";
import { Closebutton } from "@shared/components/buttons/Closebutton";
import { useUserStore } from "@store/useUserStore";
import { menuItems, subproductsItems } from "../utils/info";
import { useAuth } from "@/shared/hooks/api/auth/useAuth";
import { ModalLogin } from "@/shared/components/auth/ModalLogin";
import { Role } from "@/types/AuthTypes";

interface IMenuDrawer {
  handleMenuDrawerClose: () => void;
}
export const MenuDrawer: React.FC<IMenuDrawer> = ({handleMenuDrawerClose}) => {

  const [isUserDropdown, setIsUserDropdown] = useState<boolean>(true);
  const [isMushroomDropdown, setIsMushroomDropdown] = useState<boolean>(true);
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isOpenForgetPass, setIsOpenForgetPass] = useState<boolean>(false);
  
  const user = useUserStore(state => state.user);
  const { signOut } = useAuth();

  const handleCloseLogin = () => {
    setIsOpenLogin(false);
    setIsOpenForgetPass(false);
  }

  return (
    <Box sx={{ textAlign: 'center', position: 'relative', height: '100%', padding: "12px", color: greyColor[950] }}>
      {/* logo */}
      <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center', marginTop: "1rem", marginLeft: "1rem", cursor: "pointer"}}>
        <Box 
          component={"img"} 
          src={logoTextHorizontal} 
          alt="Logo Mundo Adaptógenos" 
          height="50px" 
          decoding="async"
          loading="lazy"
        />
      </Box>
      {/* boton para cerrar */}
      <Closebutton closeModal={handleMenuDrawerClose} id="bt-close-drawer"/>
      <Box>
        <Box sx={{marginY: "12px"}}>
          {!user
          ? <Box sx={{display: 'flex', gap: "8px", paddingX: "12px", alignItems: "center", height: "42px"}}
            onClick={() => setIsOpenLogin(true)}>
              <PersonOutlineOutlinedIcon />
              <Heading5 sx={{ "&:hover":{color: greyColor[950],  }}}>
                Iniciar Sesión
              </Heading5>
            </Box>
          : <><Box 
            sx={{display: 'flex', justifyContent: "space-between", paddingX: "12px", alignItems: "center", height: "42px"}}
            onClick={() => setIsUserDropdown(!isUserDropdown)}
            >
              <Box sx={{display: 'flex', gap: "8px", alignItems: "center",}}>
                <AccountCircleOutlinedIcon />
                <Heading5 sx={{ "&:hover":{color: greyColor[950],  }}}>
                  {user.email}
                </Heading5>
              </Box>
              <ArrowDropDownOutlinedIcon 
              sx={{
                transform: isUserDropdown ? "rotate(180deg)" : "rotate(0deg)",
                transition: "all 0.6s ease-in-out",
              }}
              />
            </Box>
            <Collapse in={isUserDropdown}>
              {user.role === Role.ADMIN 
              ? <Box component={"a"} href={"./shopping-history"} sx={{display: 'flex', gap: "8px", paddingLeft: "36px", alignItems: "center", height: "42px"}}>
                <DashboardCustomizeOutlinedIcon />
                <Heading5 sx={{ "&:hover":{color: greyColor[950],  }}}>
                  Panel de Administrador
                </Heading5>
              </Box>
              : <Box component={"a"} href={"./shopping-history"} sx={{display: 'flex', gap: "8px", paddingLeft: "36px", alignItems: "center", height: "42px"}}>
                <ShoppingBagOutlinedIcon />
                <Heading5 sx={{ "&:hover":{color: greyColor[950],  }}}>
                  Mis compras
                </Heading5>
              </Box>
              }
              <Box component={"a"} href={"./profile"} sx={{display: 'flex', gap: "8px", paddingLeft: "36px", alignItems: "center", height: "42px"}}>
                <ManageAccountsOutlinedIcon />
                <Heading5 sx={{ "&:hover":{color: greyColor[950],  }}}>
                  Editar información
                </Heading5>
              </Box>
            </Collapse>
            
            </>
          }
        </Box>
        <List sx={{borderTop: `1px solid ${greyColor[400]}`, borderBottom: `1px solid ${greyColor[400]}`}}>
          <Box component={"a"} href={"./"} sx={{display: 'flex', gap: "8px", paddingX: "12px", alignItems: "center", height: "42px"}}>
            <Heading5 sx={{ "&:hover":{color: greyColor[950],  }}}>
              Inicio
            </Heading5>
          </Box>
          <Box component={"a"} href={"./shop"} sx={{display: 'flex', gap: "8px", paddingX: "12px", alignItems: "center", height: "42px"}}>
            <Heading5 sx={{ "&:hover":{color: greyColor[950],  }}}>
              Comprar
            </Heading5>
          </Box>
          <Box 
          sx={{display: 'flex', justifyContent: "space-between", gap: "8px", paddingX: "12px", alignItems: "center", height: "42px"}}
          onClick={() => setIsMushroomDropdown(!isMushroomDropdown)}
          >
            <Heading5 sx={{ "&:hover":{color: greyColor[950],  }}}>
              Saber más de cada hongo
            </Heading5>
            <ArrowDropDownOutlinedIcon 
            sx={{
              transform: isMushroomDropdown ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all 0.6s ease-in-out",
            }}
            />
          </Box>
          <Collapse in={isMushroomDropdown}>
          {subproductsItems.map((item) => (
          <Box key={item.text.split(" ").join("_")} component={"a"} href={item.path} sx={{display: 'flex', gap: "8px", paddingLeft: "36px", alignItems: "center", height: "42px"}}>
            <Heading5 sx={{ "&:hover":{color: greyColor[950],  }}}>
              {item.text}
            </Heading5>
          </Box>
        ))}
          </Collapse>

        </List>
        
      </Box>
      <Box>
        <List>
          {menuItems.filter(item => item.path !== '/complaints-book').map((item) => (
            <Box key={item.text.split(" ").join("_")} component={"a"} href={item.path} sx={{display: 'flex', gap: "8px", paddingX: "12px", alignItems: "center", height: "42px"}}>
              {item.icon}
              <Heading5 sx={{ "&:hover":{color: greyColor[950], }}}>
                {item.text}
              </Heading5>
            </Box>
          ))}
        </List>
      </Box>
      <Box sx={{borderTop: `1px solid ${greyColor[400]}`}}>
          {!!user && 
          <Box sx={{display: 'flex', gap: "8px", paddingX: "12px", alignItems: "center", height: "42px", marginY: "12px"}}
            onClick={async () => {
              try {
                console.log("Logout iniciado");
                await signOut();
                handleMenuDrawerClose(); // Cerrar el drawer después del logout
              } catch (error) {
                console.error("Error al cerrar sesión:", error);
              }
            }}
          >
            <Heading5 sx={{color: redColor[700],}}>
              Cerrar Sesion
            </Heading5>
          </Box>
          }
      </Box>
      <ModalLogin 
        isOpenLogin={isOpenLogin} 
        handleClose={() => handleCloseLogin()} 
        setIsOpenForgetPass={setIsOpenForgetPass}
        isOpenForgetPass={isOpenForgetPass}
      />
    </Box>
  )
}