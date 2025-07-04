// src/modules/admin/components/MenuAdmin.tsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  List,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { MenuOptionsBottom, MenuOptionsTop } from "../utils/info";
import { greyColor, primaryColor } from "@/theme/theme";
// import { useUserStore } from "@/store/useUserStore";
import { MenuListItem } from "./MenuListItem";
import { navBarDesktopHeight, navBarMobileHeight } from "@/shared/Layout/utils/info";


export const MenuAdmin = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(isLargeScreen ? true : false);

  // const userData = useUserStore((state) => state.user);
  // const isSuperAdmin = userData?.role === "SUPER_ADMIN";
  const isSuperAdmin = true;
  
  const drawerWidthOpen: string = "295px";
  const drawerWidthClosed: string = "80px";
  const drawerHeightOpen: string = isSuperAdmin 
                                  ? `${MenuOptionsTop.length * 55 + MenuOptionsBottom.length * 55 + 40}px` 
                                  : `${MenuOptionsTop.length * 55 + 40}px`;
  const drawerHeightClosed: string = "80px";
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
    <Box sx={{ height: {xs: navBarMobileHeight, md: 0}, width: {xs: "100%", md: 0}}} />
    <Box
      sx={{ 
        display: "flex", 
        position: "fixed", 
        left: 0, 
        top: {xs: navBarMobileHeight, md: navBarDesktopHeight}, 
        height: {xs: "unset", md: `calc(100vh - ${navBarDesktopHeight})`},
        zIndex: 1000,
      }}
    >
      {/* Sidebar */}
      <Box sx={{
        height: {xs: open ? drawerHeightOpen : drawerHeightClosed , md: "100%"},
        width: {xs: "100vw", md: open ? drawerWidthOpen : drawerWidthClosed},
        transition: "all 0.3s ease-in-out",
        overflowX: "hidden",
        backgroundColor: primaryColor[200],
        color: greyColor[950],
        display: "flex",
        flexDirection: {xs: "row", md: "column"},
        position: "relative", // Ajustado al contenedor padre
      }}>
        {/* Botón para abrir/cerrar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 1,
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
          >
            <ChevronLeftOutlinedIcon sx={{ 
              transform: {xs:open ? "rotate(90deg)" : "rotate(-90deg)", md: open ? "rotate(0deg)" : "rotate(180deg)"},
              transition: "all 0.3s ease-in-out",
            }}/> 
          </IconButton>
        </Box>
        <List sx={{ 
          flexGrow: 1, 
          display: "flex",
          flexDirection: {xs: !open ? "row" : "column", md: "column"},
          transition: "all 0.3s ease-in-out",
        }}>
          {MenuOptionsTop.length > 0 && MenuOptionsTop.map((item, index) => (
            <MenuListItem key={index} item={item} index={index} currentPath={currentPath} open={open} setOpen={setOpen} />
          ))}
          {(isSuperAdmin && MenuOptionsBottom.length > 0) && MenuOptionsBottom.map((item, index) => (
            <MenuListItem key={index} item={item} index={index} currentPath={currentPath} open={open} setOpen={setOpen} />
          ))}
        </List>
      </Box>
    </Box>
    </>
  );
};
