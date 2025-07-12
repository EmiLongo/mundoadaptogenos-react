import { Box, Typography } from "@mui/material"
import React from "react"
import heroImageDesktop from '@img/home/hero_desktop.webp'
import heroImageMobile from '@img/home/hero_mobile.webp'




export const Hero: React.FC = () => {
  return (      
    <>
    {/* titulo para el SEO, no se muestra */}
      <Typography
        variant="h1" 
        component="h1" 
        sx={{ 
          color: "transparent",
          fontSize: '0.1rem',
          position: 'absolute',
          top: '-100%',
          left: '-100%',
        }}
      >
        Venta de Anteojos de Sol, Armazones de Receta, Clip-On, Indestructibles
      </Typography>
      <Box sx={{
        backgroundImage: {xs: `url(${heroImageMobile})`, md: `url(${heroImageDesktop})`},
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: {xs: '80vh', md: '75vh', lg: '75vh'},
        width: '100%',
        marginBottom: {xs: '1rem', md: '4rem'},
      }}/>

    </>
  )
}

