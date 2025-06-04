// src/shared/Layout/components/WhatsApp.tsx
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Fab, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export const WhatsApp: React.FC = () => {
  const { palette } = useTheme();
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
    href="https://wa.me/5493476619576?text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Talleres%20Montreal."
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
          width: { xs: "4rem", md: "5rem", lg: "6rem" },
          height: { xs: "4rem", md: "5rem", lg: "6rem" },
          padding: "1rem",
          backgroundColor: palette.primary[600], 
          color: "white", 
          "&:hover": { backgroundColor: palette.primary[800] } 
        }}
      >
        <WhatsAppIcon sx={{ fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" } }}/>
      </Fab>
    </Box>
  )
}