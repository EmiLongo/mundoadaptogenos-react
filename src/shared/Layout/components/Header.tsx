// components/Header.js
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Badge,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import logoText from '@img/mundo_adaptogenos.svg';
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Importar contexto del carrito (deberás crearlo)
// import { useCart } from '../contexts/CartContext';

export const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  // const { cartItems } = useCart();
  // Asume que tienes un contexto para el carrito
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const menuItems = [
    { text: 'Melena de León', path: '/melena' },
    { text: 'Cordyceps Militaris', path: '/cordyceps' },
    { text: 'Reishi', path: '/reishi' },
    { text: 'Cola de Pavo', path: '/cola-pavo' },
  ];
  
  const infoItems = [
    { text: 'Preguntas Frecuentes', path: '/preguntas-frecuentes' },
    { text: 'Contacto', path: '/contacto' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ p: 2 }}>
        <img src={logoText} alt="Logo Mundo Adaptógenos" height="40" />
      </Box>
      <List>
        <ListItem component={RouterLink} to="/">
          <ListItemText primary="Home / Productos" />
        </ListItem>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={RouterLink} to={item.path} sx={{ pl: 4 }}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {infoItems.map((item) => (
          <ListItem key={item.text} component={RouterLink} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor:"primary.light" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile ? (
              <>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <RouterLink to="/">
                    <img src={logoText} alt="Logo Mundo Adaptógenos" height="40" />
                  </RouterLink>
                </Box>
                <IconButton component={RouterLink} to="/cart" color="inherit">
                  {/* <Badge badgeContent={cartItems.length} color="primary"> */}
                  <Badge badgeContent={"1"} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </>
            ) : (
              <>
                <RouterLink to="/" style={{ flexGrow: 0, marginRight: '24px' }}>
                  <img src={logoText} alt="Logo Mundo Adaptógenos" height="60" />
                </RouterLink>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                  {menuItems.map((item) => (
                    <Button
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      sx={{ color: 'text.primary', mx: 1 }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
                <IconButton component={RouterLink} to="/cart" sx={{ mx: 2 }}>
                  {/* <Badge badgeContent={cartItems.length} color="primary"> */}
                  <Badge badgeContent={"1"} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Box sx={{ display: 'flex' }}>
                  {infoItems.map((item) => (
                    <Button
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      sx={{ color: 'text.primary', mx: 1 }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
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