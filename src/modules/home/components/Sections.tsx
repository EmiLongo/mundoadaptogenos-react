import { Box } from "@mui/material"
import React from "react"
import BannerCategoria1 from '@img/home/BannerCategoria1.webp'
import BannerCategoria2 from '@img/home/BannerCategoria2.webp'
import BannerCategoria3 from '@img/home/BannerCategoria3.webp'
import BannerCategoria4 from '@img/home/BannerCategoria4.webp'
import { Heading2 } from "@/theme/textStyles"

// TODO: Agregar las secciones de la home con el backend
const sections = [
  {
    title: 'Anteojos de Sol',
    image: BannerCategoria3,
  },
  {
    title: 'Recetados',
    image: BannerCategoria2,
  },
  {
    title: 'Clip-On',
    image: BannerCategoria1,
  },
  {
    title: 'Indestructibles',
    image: BannerCategoria4,
  }
]
export const Sections: React.FC = () => {
  return (
    <Box sx={{
      display: {xs: 'none', md: 'flex'},
    }}>
      {sections.map((section, index) => (
      <Box 
      key={`section-${index}-${section.title.toLowerCase().replace(/ /g, '-')}`}
      sx={{
        display: 'flex',
        alignItems: 'end',
        flex: 1,
        height: {md: '160px', lg: '180px', xl: '200px'},
        backgroundImage: `url(${section.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70px',
          width: '100%',
          backgroundImage: `linear-gradient(to top,rgba(255, 255, 255, 0.7), #FFFFFF00)`,
        }}>
          <Heading2 sx={{ lineHeight:1, textAlign: "center" }}>{section.title}</Heading2>
        </Box>
      </Box>
      ))}
    </Box>
  )
}
