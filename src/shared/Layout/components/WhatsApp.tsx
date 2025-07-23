// src/shared/Layout/components/WhatsApp.tsx
import { greenColor, greyColor } from '@/theme/theme';
import { Box, Fab } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import WhatsAppIcon from '@img/icons/RiWhatsappWhiteFill.svg';

export const WhatsApp: React.FC = () => {
  const [bottomOffset, setBottomOffset] = useState(32); // en px, equivale a 2rem
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      const icon = iconRef.current;
      if (!footer || !icon) return;

      const footerRect = footer.getBoundingClientRect();
      // const iconHeight = icon.offsetHeight;

      const viewportHeight = window.innerHeight;
      const distanceToBottom = viewportHeight - footerRect.top;

      if (distanceToBottom > 0) {
        // Se está solapando, ajustar hacia arriba
        setBottomOffset(distanceToBottom + 32); // 32px extra como margen
      } else {
        setBottomOffset(32); // posición normal
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // para manejar cambios de altura
    handleScroll(); // inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  return (
    <Box 
    id="whatsapp"
    ref={iconRef}
    component={"a"}
    href="https://wa.me/5493412667096?text=🍄%20Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20hongos%20adaptógenos."
    target="_blank"
    rel="noopener noreferrer"
    sx={{ 
      position: "fixed", 
      bottom: `${bottomOffset}px`,
      // bottom: {xs: "1rem", md: "2rem", lg: "3rem"},
      right: {xs: "1rem", md: "2rem", lg: "3rem"}, 
      zIndex: 100 
    }}
    >
      <Fab aria-label="whatsapp"
        sx={{ 
          width: { xs: "4rem", md: "5rem", xl: "6rem" },
          height: { xs: "4rem", md: "5rem", xl: "6rem" },
          backgroundColor: greenColor[900], 
          "&:hover": { backgroundColor: greenColor[950] } 
        }}
      >
        <Box 
        component="img" 
        src={WhatsAppIcon} 
        alt='Icono de Whatsapp'
        sx={{ 
          fill: greyColor[50],
          width: {xs: "32px", md: "40px", xl:"48px"} 
        }}
        />
      </Fab>
    </Box>
  )
}