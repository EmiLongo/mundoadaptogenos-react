// src/modules/home/components/Parallax.tsx
import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import fondo1 from "@img/home/hero/fondo1.png"
import fondo2 from "@img/home/hero/fondo2.png"
import fondo3 from "@img/home/hero/fondo3.png"
import fondo4 from "@img/home/hero/fondo4.png"
import fondo5 from "@img/home/hero/fondo5.png"

const images = [
  { src: fondo1, zIndex: 5, initialScale: 1.4 },
  { src: fondo2, zIndex: 4, initialScale: 1.2 },
  { src: fondo3, zIndex: 3, initialScale: 0.8 },
  { src: fondo4, zIndex: 2, initialScale: 0.9 },
  { src: fondo5, zIndex: 1, initialScale: 1.0 },
]

export const Parallax: React.FC = () => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true)
    }, 100) // pequeña espera para que el efecto se note al montar

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          component="img"
          src={img.src}
          alt={`fondo${index + 1}`}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: img.zIndex,
            transform: animate
              ? "scale(1)"
              : `scale(${img.initialScale})`,
            transition: "transform 1.5s ease-out",
          }}
        />
      ))}
    </Box>
  )
}
