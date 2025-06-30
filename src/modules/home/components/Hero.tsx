import { Typography } from "@mui/material"
import React from "react"

export const Hero: React.FC = () => {
  return (      
    <>
    {/* titulo para el SEO, no se muestra */}
      <Typography
        variant="h1" 
        component="h1" 
        sx={{ 
          color: "transparent",
          fontSize: '0.5rem',
          position: 'absolute',
          top: '-100%',
          left: '-100%',
        }}
      >
        Venta de Extracción Hongos Adaptógenos, Melena de León, Cordyceps Militaris, Reishi, Cola de Pavo, Màxima Pureza
      </Typography>
    </>
  )
}