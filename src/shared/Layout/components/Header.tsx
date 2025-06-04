// components/Header.js
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  Container,
  useMediaQuery,
  useTheme,
  Badge
} from '@mui/material';
import logoTextHorizontal from '@img/mundo_adaptogenos.svg';
import logoTextVertical from '@img/logo_img.svg';
import inpulseLogo from "@img/inpulse_design_logo_negro_color.svg";

import { Menu as MenuIcon, Close as CloseIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Text3, Title2 } from '@theme/textStyles';
import { useNavigate } from 'react-router-dom';

export const menuItems = [
  { text: 'Melena de León', path: '/melena' },
  { text: 'Cordyceps Militaris', path: '/cordyceps' },
  { text: 'Reishi', path: '/reishi' },
  { text: 'Cola de Pavo', path: '/cola-pavo' },
];

export const infoItems = [
  // { text: 'Inicio', path: '#home' },
  { text: 'Que hacemos', path: '#whatwedo' },
  { text: 'Servicios', path: '#services' },
  { text: 'Equipamiento', path: '#equipment' },
  { text: 'Contacto', path: '#contact' },
];

export const Header: React.FC = () => {
  const theme = useTheme();
  const { palette } = theme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
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
        {menuItems.map((item) => (
          <Box key={item.text} component={"a"} href={item.path}>
            <Title2 sx={{ fontSize: '1.2rem', color: palette.text.primary, textTransform: 'none', }}>{item.text}</Title2>
          </Box>
        ))}
        {infoItems.map((item) => (
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
      {/* <Box sx={{ height: "70px" }} id="home"/> */}
      <AppBar 
      id="navbar"
      position="fixed" 
      color="default" 
      elevation={1} 
      sx={{
        height: "70px",
        backgroundColor: "#f3f6fc82",
        backdropFilter: "blur(10px) saturate(180%)",
        WebkitBackdropFilter: "blur(10px) saturate(180%)",

      }}
      >
        <Container maxWidth="xl" sx={{ height: '100%' }}>
          <Toolbar disableGutters sx={{ height: '100%' }}>
            {isMobile ? (
              // versión móvil
              <>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center',  paddingX: { xs: '1rem',} }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
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
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Box>
              </>
            ) : (
              // versión escritorio
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem', xl: '8rem'} }}>
                <Box 
                  component={"img"}
                  src={logoTextHorizontal}
                  alt="Logo Mundo Adaptógenos"
                  height="40px"
                  onClick={handleLogoClick}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs: '3rem', lg: '4rem', xl: '5rem'} }}>
                  {menuItems.map((item) => (
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
                  <IconButton onClick={() => navigate("/cart")} sx={{ mx: 2 }}>
                    {/* <Badge badgeContent={cartItems.length} color="primary"> */}
                    <Badge badgeContent={"1"} color="primary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                  {infoItems.map((item) => (
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
              </Box>
            )}
          </Toolbar>
        </Container>
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
      {/* titulo para el SEO, no se muestra */}
      <Typography 
        variant="h1" 
        component="h1" 
        sx={{ 
          fontSize: '0.5rem',
          position: 'absolute',
          top: '-100%',
          left: '-100%',
        }}
      >
        Venta de Extracción Hongos Adaptógenos, Melena de León, Cordyceps Militaris, Reishi, Cola de Pavo, Màxima Pureza
      </Typography>
    </>
  );
};