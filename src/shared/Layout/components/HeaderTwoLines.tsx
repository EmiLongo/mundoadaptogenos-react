// components/Header.js
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  Drawer, 
  List,
  useMediaQuery,
  useTheme,
  Badge
} from '@mui/material';
import logoTextHorizontal from '@img/mundo_adaptogenos.svg';
import logoTextVertical from '@img/logo_img.svg';
import inpulseLogo from "@img/inpulse_design_logo_negro_color.svg";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { Text3, Title2, TextBox } from '@theme/textStyles';
import { useNavigate } from 'react-router-dom';
import { isNavBarTransparent, menuItems, navBarDesktopHeight, navBarMobileHeight, productsItems } from '../utils/info';
import { SearchField } from './SearchField';
import { greyColor } from '@/theme/theme';
import { LoginButton } from './LoginButton';


export const HeaderTwoLines: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { palette } = theme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleLogoClick = () => {
    window.location.href = '#hero';
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', position: 'relative', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: "3rem", mb: "2rem" }}>
        <Box 
          component={"img"} 
          src={logoTextVertical} 
          alt="Logo Mundo Adaptógenos" 
          height="100px" 
          onClick={handleLogoClick}
          decoding="async"
          loading="lazy"
        />
      </Box>
      <Box
        sx={{ position: 'absolute', top: "1rem", right: "1rem" }}
        onClick={handleDrawerToggle}
      >
        <CloseIcon />
      </Box>
      <Box
        sx={{ position: 'absolute', top: "1rem", left: "1rem" }}
        onClick={handleDrawerToggle}
      />
      <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        {productsItems.map((item) => (
          <Box key={item.text} component={"a"} href={item.path}>
            <Title2 sx={{ fontSize: '1.2rem', color: palette.text.primary, textTransform: 'none', }}>{item.text}</Title2>
          </Box>
        ))}
        {menuItems.map((item) => (
          <Box key={item.text} component={"a"} href={item.path}>
            <Title2 sx={{ fontSize: '1.2rem', color: palette.text.primary, textTransform: 'none', }}>{item.text}</Title2>
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
        <Text3 sx={{ color: "inherit",textAlign: "center" }}>
          Desarrollado por
        </Text3>
      </Box>
    </Box>
  );

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
        backgroundColor: "#f3f6fc82",
        backdropFilter: "blur(10px) saturate(180%)",
        WebkitBackdropFilter: "blur(10px) saturate(180%)",
      }}
      >
        <Box sx={{ height: '100%', width: "100%" }}>
            {isMobile ? (
              // versión móvil
              <Toolbar disableGutters sx={{ height: '100%' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: "space-between", paddingX: { xs: '1rem',} }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, border: "none" }}
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
                  <IconButton onClick={() => navigate("/cart")} sx={{ mx: 2 }}>
                    {/* <Badge badgeContent={cartItems.length} color="primary"> */}
                    <Badge badgeContent={"1"} color="primary">
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Box>
              </Toolbar>
            ) : (
              // versión escritorio
              <>
              <Toolbar disableGutters sx={{ height: '100px', borderBottom: `1px solid ${greyColor[500]}`, width: "100%", justifyContent: "center" }}>
                <Box sx={{ 
                  flexGrow: 1, 
                  maxWidth: "1280px",
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  paddingX: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem', xl: '8rem'},
                  gap: {xs: '1rem', sm: '2rem', md: '3rem', lg: '4rem', xl: '5rem'}
                }}>
                  <SearchField sx={{flex: 1}}/>
                  <Box 
                    component={"img"}
                    src={logoTextHorizontal}
                    alt="Logo Mundo Adaptógenos"
                    height="40px"
                    onClick={handleLogoClick}
                    sx={{flex: 1}}
                  />
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'end',
                    // gap: {xs: '1rem', lg: '2rem', xl: '3rem'} 
                    gap: '1rem',
                    flex: 1,
                  }}>
                    {/* TODO: refactorizar boton de carrito */}
                    <IconButton onClick={() => navigate("/cart")} sx={{ width: "100px" }}>
                      {/* <Badge badgeContent={cartItems.length} color="primary"> */}
                      <Badge badgeContent={"1"} color="primary">
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                      <TextBox sx={{ color: greyColor[600] }}>Carrito</TextBox>
                    </IconButton>
                    <LoginButton />

                    {/* {menuItems.map((item) => (
                      <Box
                        key={item.text}
                        component={"a"}
                        href={item.path}
                      >
                        <Title2 sx={{
                          fontWeight: 500,
                          color: 'text.primary',
                          '&:hover': {
                            color: palette.primary[600],
                          },
                          textTransform: 'none',
                        }}>{item.text}</Title2>
                      </Box>
                    ))} */}
                  </Box>
                </Box>
              </Toolbar>
              <Toolbar disableGutters sx={{ height: '50px', minHeight: {xs: '50px', md: '50px', lg: '50px', xl: '50px'}, justifyContent: "center" }}>
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
                        <Title2 sx={{
                          fontWeight: 500,
                          color: 'text.primary',
                          '&:hover': {
                            color: palette.primary[600],
                          },
                          textTransform: 'none',
                        }}>{item.text}</Title2>
                      </Box>
                    ))}
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};