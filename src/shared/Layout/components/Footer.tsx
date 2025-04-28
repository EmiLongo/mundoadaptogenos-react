import React from 'react';
import { Box, Typography, List, ListItem, Container, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Instagram, Facebook, WhatsApp, Telegram, Share } from '@mui/icons-material';

// Estilos personalizados
const StyledFooter = styled('footer')({
  backgroundColor: '#6A1C1C',
  color: '#FCDADA',
  fontFamily: "'Homenaje', sans-serif",
});

const FooterList = styled(List)({
  display: 'flex',
  listStyleType: 'none',
  margin: 0,
});

const FooterLink = styled(Link)({
  textDecoration: 'none',
  color: '#FCDADA',
  '&:hover': {
    color: '#FCDADA',
  },
});

export const Footer: React.FC = () => {
  // Función para compartir URL
  const shareURL = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mundo Adaptógenos',
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('¡URL copiada al portapapeles!'))
        .catch(() => alert('No se pudo copiar la URL'));
    }
  };

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Box id="footerContainer" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box id="footerLeft">
            <Typography component="p">NUESTRAS REDES:</Typography>
            <FooterList>
              <ListItem component="li">
                <FooterLink href="https://www.instagram.com/mundoadaptogenos/" target="_blank">
                  <Instagram width={24} height={24} />
                </FooterLink>
              </ListItem>
              
              <ListItem component="li">
                <FooterLink href="https://www.facebook.com/mundoadaptogenos" target="_blank">
                  <Facebook width={24} height={24}/>
                </FooterLink>
              </ListItem>
              
              <ListItem component="li">
                <FooterLink href="https://wa.link/hw4q1x" target="_blank">
                  <WhatsApp width={24} height={24} />
                </FooterLink>
              </ListItem>
              
              <ListItem component="li">
                <FooterLink href="http://t.me/mundoadaptogenos" target="_blank">
                  <Telegram width={24} height={24} />
                </FooterLink>
              </ListItem>
              
            </FooterList>
            <Box 
              id="shareURL" 
              onClick={shareURL} 
              sx={{ cursor: 'pointer' }}
            >
              Compartir página{' '}
              <Share 
                width={24} 
                height={24} 
                sx={{ verticalAlign: 'middle', marginLeft: 1 }}
              />
            </Box>
          </Box>
          
          <Box id="footerRight">
            <Typography component="p" variant='h6'>NUESTRA WEB:</Typography>
            <FooterList>
              <ListItem component="li">Home / Productos</ListItem>

              <ListItem component="li">
                <FooterLink href="./preguntas_frecuentes.html">Preguntas Frecuentes</FooterLink>
              </ListItem>
              <ListItem component="li">
                <FooterLink href="./contacto.html">Contacto</FooterLink>
              </ListItem>
            </FooterList>
            <Typography component="p">NUESTROS PRODUCTOS:</Typography>
            <FooterList>
              <ListItem component="li">
                <FooterLink href="./melena.html">Melena de León</FooterLink>
              </ListItem>
              <ListItem component="li">
                <FooterLink href="./cordyceps.html">Cordyceps Militaris</FooterLink>
              </ListItem>
              <ListItem component="li">
                <FooterLink href="./reishi.html">Reishi</FooterLink>
              </ListItem>
              <ListItem component="li">
                <FooterLink href="./cola_pavo.html">Cola de Pavo</FooterLink>
              </ListItem>
            </FooterList>
          </Box>
        </Box>
        
        <Typography component="p" sx={{ textAlign: 'center', padding: '1em 0' }}>
          Derechos reservados © {new Date().getFullYear()}. INPULSE DESIGN.
        </Typography>
      </Container>
    </StyledFooter>
  );
};