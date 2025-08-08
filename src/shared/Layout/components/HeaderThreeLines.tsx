// components/Header.js
import React, { useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  Drawer, 
  List,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import logoTextHorizontal from '@img/logo-nombre-horizontal.svg';
import inpulseLogo from "@img/inpulse_design_logo_negro_color.svg";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { BodyM, BodyS, Heading5 } from '@theme/textStyles';
import { brownColor, greyColor } from '@theme/theme';
import { CartButton } from '@shared/cart/CartButton';
import { ProductConfirm } from '@shared/cart/ProductConfirm';
import { useCart } from '@store/useCartStore';

import { FAQButton } from './FAQButton.tsx';
import { ContactButton } from './ContactButton.tsx';
import { isNavBarTransparent, menuItems, navBar12DesktopHeight, navBar1DesktopHeight, navBar2DesktopHeight, navBarDesktopHeight, navBarDesktopInfoHeight, navBarMobileHeight, productsItems } from '../utils/info.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginButton } from './LoginButton.tsx';
import { useCartDrawer } from '@/store/useCartDrawer.ts';


export const HeaderThreeLines: React.FC = () => {
  const { initializeCart } = useCart();
  const { lastAddedProduct, lastAddedAt } = useCart();
  const { isOpenCartDrawer, toggleCartDrawer, setCartDrawer } = useCartDrawer();
  const theme = useTheme();
  const { palette } = theme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleCartButton = () => {
    toggleCartDrawer()
  }

  const handleMenuDrawerToggle = () => {
    if(!mobileMenuOpen){
      handleMenuDrawerOpen()
    } else {
      handleMenuDrawerClose()
    }
  };
  
  const handleLogoClick = () => {
    navigate('/');
  };

   // Función para abrir el drawer
   const handleMenuDrawerOpen = () => {
    setMobileMenuOpen(true);
    // Agregar una entrada al historial cuando se abre el drawer
    window.history.pushState({ drawerOpen: true }, '');
  };

  // Función para cerrar el drawer
  const handleMenuDrawerClose = () => {
    setMobileMenuOpen(false);
    // Si hay una entrada en el historial para el drawer, la removemos
    if (window.history.state?.drawerOpen) {
      window.history.back();
    }
  };

   // Función para abrir el drawer
   const handleCartDrawerOpen = () => {
    setCartDrawer(true);
    // Agregar una entrada al historial cuando se abre el drawer
    window.history.pushState({ drawerOpen: true }, '');
  };

  // Función para cerrar el drawer
  const handleCartDrawerClose = () => {
    setCartDrawer(false);
    // Si hay una entrada en el historial para el drawer, la removemos
    if (window.history.state?.drawerOpen) {
      window.history.back();
    }
  };

  useEffect(() => {
    // Función que maneja el evento popstate (tecla atrás)
    const handlePopState = (event: PopStateEvent) => {
      // Si el drawer está abierto y no hay estado de drawer en el historial
      if (isOpenCartDrawer && !event.state?.drawerOpen) {
        setCartDrawer(false);
      }
      if (mobileMenuOpen && !event.state?.drawerOpen) {
        setMobileMenuOpen(false);
      }
    };

    // Agregar el listener para el evento popstate
    window.addEventListener('popstate', handlePopState);

    // Cleanup: remover el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpenCartDrawer, mobileMenuOpen]);

  // menu lateral en mobile
  const drawer = (
    <Box onClick={handleMenuDrawerToggle} sx={{ textAlign: 'center', position: 'relative', height: '100%', padding: "12px" }}>
      {/* logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: "1rem", mb: "2rem"}}>
        <Box 
          component={"img"} 
          src={logoTextHorizontal} 
          alt="Logo Mundo Adaptógenos" 
          width="190px" 
          onClick={handleLogoClick}
          decoding="async"
          loading="lazy"
        />
      </Box>
      {/* boton para cerrar */}
      <Box
        sx={{ position: 'absolute', top: "1rem", right: "1rem" }}
        onClick={handleMenuDrawerToggle}
      >
        <CloseIcon />
      </Box>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {productsItems.map((item) => (
          <Box key={item.text.split(" ").join("_")} component={"a"} href={item.path} sx={{display: 'flex', gap: "8px", paddingX: "12px"}}>
            <Heading5 sx={{ "&:hover":{color: palette.text.primary,  }}}>
              {item.text}
            </Heading5>
          </Box>
        ))}
        <Divider />
        {menuItems.filter(item => item.path !== '/complaints-book').map((item) => (
          <Box key={item.text.split(" ").join("_")} component={"a"} href={item.path} sx={{display: 'flex', gap: "8px", paddingX: "12px"}}>
            {item.icon}
            <Heading5 sx={{ "&:hover":{color: palette.text.primary, }}}>
              {item.text}
            </Heading5>
          </Box>
        ))}
      </List>
      <Box
        component={"a"}
        href="https://inpulse.com.ar"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          position: 'absolute', bottom: "1rem" 
        }}
      >
        <Box
          component={"img"}
          src={inpulseLogo}
          alt="Logo Inpulse Design"
          width={100}
          decoding="async"
          loading="lazy"
        />
        <BodyS sx={{ color: "inherit",textAlign: "center" }}>
          Desarrollado por
        </BodyS>
      </Box>
    </Box>
  );

  // se inicializa el carrito
  useEffect(() => {
    // Inicializar con sessionId único para usuarios no logueados
    const sessionId = localStorage.getItem('sessionId') || 
                     `session_${Date.now()}_${Math.random()}`;
    
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', sessionId);
    }
    
    initializeCart(undefined, sessionId);
  }, []);

  return (
    <>
      {!isNavBarTransparent && <Box sx={{ height: isMobile ? navBarMobileHeight : navBarDesktopHeight }} />}
      <AppBar 
      id="navbar"
      position="fixed" 
      color="default" 
      elevation={1} 
      sx={{
        width: "100%",
        height: isMobile ? navBarMobileHeight : navBarDesktopHeight, 
        backgroundColor: greyColor[50],
      }}
      >
        {!isMobile && 
          <Box sx={{width: "100%", height: navBarDesktopInfoHeight, display: "flex", justifyContent:"center", alignItems: "center", backgroundColor: greyColor[200] }}>
            <BodyM>20% OFF POR TRANSFERENCIA | 3 Y 6 CUOTAS SIN INTERÉS CON TODOS LOS BANCOS | ENVÍOS GRATIS (SOLO ARGENTINA)</BodyM>
          </Box>
        }
        <Box sx={{ height: navBar12DesktopHeight, width: "100%", backgroundColor: greyColor[50] }}>
            {isMobile ? (
              // versión móvil
              <Toolbar disableGutters sx={{ height: '100%' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: "space-between", paddingX: { xs: '1rem',} }}>
                  <Box sx={{display: "flex", gap: "20px"}}>
                    <IconButton
                      id="bti-menu-icon"
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleMenuDrawerToggle}
                      sx={{ border: "none" }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Box 
                    component={"img"}
                    src={logoTextHorizontal}
                    alt="Logo Mundo Adaptógenos"
                    height="40px"
                    onClick={handleLogoClick}
                    />
                  </Box>
                  <CartButton openCartDrawer={isOpenCartDrawer} closeCartDrawer={handleCartDrawerClose} handleCartButton={handleCartButton} />
                </Box>
              </Toolbar>
            ) : (
              // versión escritorio
              <>
              <Toolbar disableGutters sx={{ 
                height: navBar1DesktopHeight, 
                borderBottom: `1px solid ${greyColor[500]}`, 
                width: "100%", 
                justifyContent: "center",
                backgroundColor: greyColor[50] }}>
                <Box sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  paddingX: { md: '4rem', lg: '5rem', xl: '8rem'},
                }}>
                  <Box 
                    component={"img"}
                    src={logoTextHorizontal}
                    alt="Logo Mundo Adaptógenos"
                    height="60px"
                    onClick={handleLogoClick}
                    sx={{cursor: "pointer" }}
                  />
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'end',
                    gap: '1rem',
                    flex: 1,
                  }}>
                  <ContactButton />
                  <CartButton openCartDrawer={isOpenCartDrawer} closeCartDrawer={handleCartDrawerClose} handleCartButton={handleCartButton} />
                  <FAQButton />
                  <LoginButton />
                  </Box>
                </Box>
              </Toolbar>
              <Toolbar disableGutters sx={{ height: navBar2DesktopHeight, minHeight: {xs: '50px', md: '50px', lg: '50px', xl: '50px'}, justifyContent: "center" }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '100%',
                  height: "100%",
                  maxWidth: "1280px",
                  gap: {xs: '3rem', lg: '4rem', xl: '5rem'},
                  backgroundColor: greyColor[50],
                }}>
                  {productsItems.map((item) => (
                    <Box
                      key={item.text}
                      component={"a"}
                      href={item.path}
                      sx={{
                        display: 'flex',
                        alignItems: "center",
                        height: "100%", 
                        borderBottom: pathname.includes(item.path) ? `3px solid ${brownColor[800]}` : "none",
                        "&:hover":{
                          borderBottom: pathname.includes(item.path) ? `3px solid ${brownColor[800]}` : `3px solid ${greyColor[900]}`,
                        }
                      }}
                    >
                      <Heading5 sx={{
                        color: pathname.includes(item.path) ? brownColor[800] : greyColor[950],
                        fontWeight: pathname.includes(item.path) ? 900 : 500,
                        "&:hover":{
                          fontWeight: 900,
                        }
                      }}>
                        {item.text}
                      </Heading5>
                    </Box>
                  ))}
                  {/* {menuItems.map((item) => (
                    <Box
                      key={item.text}
                      component={"a"}
                      href={item.path}
                    >
                      <Heading5 sx={{ "&:hover":{color: palette.text.primary, }}}>
                        {item.text}
                      </Heading5>
                    </Box>
                  ))} */}
                </Box>
              </Toolbar>
            </>
            )}
        </Box>
      </AppBar>
      <Box component="nav">
        {/* Menú lateral en versión móvil */}
        <Drawer
          variant="temporary"
          open={mobileMenuOpen}
          onClose={handleMenuDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento en móviles
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 350, backgroundColor: greyColor[50] },
          }}
        >
          {drawer}
        </Drawer>
        {lastAddedProduct && <ProductConfirm 
          handleCartDrawerOpen={handleCartDrawerOpen}
          lastAddedProduct={lastAddedProduct}
          lastAddedAt={lastAddedAt}
        />}
      </Box>
    </>
  );
};