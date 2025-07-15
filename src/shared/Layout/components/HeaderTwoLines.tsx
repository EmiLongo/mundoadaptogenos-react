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

import { BodyS, Heading5 } from '@theme/textStyles';
import { greyColor } from '@theme/theme';
import { CartButton } from '@shared/cart/CartButton';
import { ProductConfirm } from '@shared/cart/ProductConfirm';
import { useCart } from '@store/useCartStore';

import { FAQButton } from './FAQButton';
import { ContactButton } from './ContactButton';
import { isNavBarTransparent, menuItems, navBar1DesktopHeight, navBar2DesktopHeight, navBarDesktopHeight, navBarMobileHeight, productsItems } from '../utils/info.tsx';


export const HeaderTwoLines: React.FC = () => {
  const { initializeCart } = useCart();
  const { lastAddedProduct, lastAddedAt } = useCart();
  const theme = useTheme();
  const { palette } = theme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState<boolean>(false)

  const closeCartDrawer = () => {
    setOpenCartDrawer(false)
  }
  const handleCartButton = () => {
    setOpenCartDrawer(!openCartDrawer)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleLogoClick = () => {
    window.location.href = './';
  };

 

  // menu lateral en mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', position: 'relative', height: '100%', padding: "12px" }}>
      {/* logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: "1rem", mb: "2rem" }}>
        <Box 
          component={"img"} 
          src={logoTextHorizontal} 
          alt="Logo Óptica Villagra" 
          width="190px" 
          onClick={handleLogoClick}
          decoding="async"
          loading="lazy"
        />
      </Box>
      {/* boton para cerrar */}
      <Box
        sx={{ position: 'absolute', top: "1rem", right: "1rem" }}
        onClick={handleDrawerToggle}
      >
        <CloseIcon />
      </Box>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {productsItems.map((item) => (
          <Box key={item.text} component={"a"} href={item.path} sx={{display: 'flex', gap: "8px", paddingX: "12px"}}>
            <Heading5 sx={{ "&:hover":{color: palette.text.primary,  }}}>
              {item.text}
            </Heading5>
          </Box>
        ))}
        <Divider />
        {menuItems.map((item) => (
          <Box key={item.text} component={"a"} href={item.path} sx={{display: 'flex', gap: "8px", paddingX: "12px"}}>
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
        backgroundColor: "backcground.default",
      }}
      >
        <Box sx={{ height: '100%', width: "100%" }}>
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
                      onClick={handleDrawerToggle}
                      sx={{ border: "none" }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Box 
                    component={"img"}
                    src={logoTextHorizontal}
                    alt="Logo Óptica Villagra"
                    height="40px"
                    onClick={handleLogoClick}
                    />
                  </Box>
                  <CartButton openCartDrawer={openCartDrawer} closeCartDrawer={closeCartDrawer} handleCartButton={handleCartButton} />
                </Box>
              </Toolbar>
            ) : (
              // versión escritorio
              <>
              <Toolbar disableGutters sx={{ 
                height: navBar1DesktopHeight, 
                borderBottom: `1px solid ${greyColor[500]}`, 
                width: "100%", 
                justifyContent: "center" }}>
                <Box sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  paddingX: { md: '4rem', lg: '5rem', xl: '8rem'},
                  // gap: {md: '3rem', lg: '4rem', xl: '5rem'}
                }}>
                  <Box 
                    component={"img"}
                    src={logoTextHorizontal}
                    alt="Logo Óptica Villagra"
                    height="60px"
                    onClick={handleLogoClick}

                  />
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'end',
                    gap: '1rem',
                    flex: 1,
                  }}>
                  <ContactButton />
                  <CartButton openCartDrawer={openCartDrawer} closeCartDrawer={closeCartDrawer} handleCartButton={handleCartButton} />
                  <FAQButton />
                  </Box>
                </Box>
              </Toolbar>
              <Toolbar disableGutters sx={{ height: navBar2DesktopHeight, minHeight: {xs: '50px', md: '50px', lg: '50px', xl: '50px'}, justifyContent: "center" }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '100%',
                  maxWidth: "1280px",
                  gap: {xs: '3rem', lg: '4rem', xl: '5rem'} 
                }}>
                  {productsItems.map((item) => (
                    <Box
                      key={item.text}
                      component={"a"}
                      href={item.path}
                    >
                      <Heading5 sx={{ "&:hover":{color: palette.text.primary, }}}>
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
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento en móviles
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 350 },
          }}
        >
          {drawer}
        </Drawer>
        {lastAddedProduct && <ProductConfirm 
          handleCartOpen={handleCartButton}
          lastAddedProduct={lastAddedProduct}
          lastAddedAt={lastAddedAt}
        />}
      </Box>
    </>
  );
};