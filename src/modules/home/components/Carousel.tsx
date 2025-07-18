import { ProductCard } from "@shared/cart/ProductCard";
import { catalogue } from "@shared/Layout/utils/catalogue";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { greyColor } from "@theme/theme";

export const Carousel: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const isTablet = useMediaQuery(theme.breakpoints.down("md"))
    const widthToMove = 258;
    const widthLimit = isMobile ? 1 : isTablet ? 2 : 3
    const [widthMoved, setWidthMoved] = useState<number>(0)
    const handleScroll = (direction: 'left' | 'right') => {
      if (direction === 'left') {
        if(widthMoved === 0) return;
        setWidthMoved(widthMoved + widthToMove);
      } else {
          if(widthMoved === -widthToMove*(catalogue.length-widthLimit)) return;
          setWidthMoved(widthMoved - widthToMove);
      }
    };
  
    return (
      <Box sx={{position:"relative", width:"100%", height: "520px", overflow:"hidden"}}>
        {/* Botón izquierdo */}
        <Box sx={{
          height: "520px",
          width: "40px",
          position: 'absolute',
          zIndex: 10,
          left: 0,
          display: {xs: "flex", lg: "none"},
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(90deg,rgba(249, 249, 249, 1) 20%, rgba(249, 249, 249, 0.01) 100%)"
        }}>
          <IconButton
            disabled={widthMoved === 0}
            onClick={()=>handleScroll("left")}
            sx={{border: "none", "&:hover": {backgroundColor: "rgba(249, 249, 249, 0.7)"}}}
          >
            <ArrowForwardIosOutlinedIcon sx={{transform: "rotate(180deg)", color: widthMoved === 0 ? greyColor[400] : greyColor[950]}} />
          </IconButton>
        </Box>
  
        {/* Carrusel de tarjetas */}
        <Box
          sx={{
            width: `${266*catalogue.length}px`,
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            overflow: "auto",
            scrollBehavior: "smooth",
            paddingLeft: {xs: "3rem", sm: "3rem", md: "4rem", lg: "5rem"},
            transform: `translateX(${widthMoved}px)`,
            transition: "all 0.3s ease-out",
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {catalogue.map((product, index) => (
            <ProductCard product={product} index={index} key={`${product.title.replace(/\s+/g, "-")}-${index}`} />
          ))}
        </Box>
  
        {/* Botón derecho */}
        <Box sx={{
          height: "520px",
          width: "40px",
          position: 'absolute',
          zIndex: 10,
          top:0,
          right: 0,
          display: {xs: "flex", lg: "none"},
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(-90deg,rgba(249, 249, 249, 0.9) 20%, rgba(249, 249, 249, 0.01) 100%)"
        }}>
          <IconButton 
            disabled={widthMoved === -widthToMove*(catalogue.length-1)}
            onClick={()=>handleScroll("right")}
            sx={{border: "none", "&:hover": {backgroundColor: "rgba(249, 249, 249, 0.7)"}}}
          >
            <ArrowForwardIosOutlinedIcon sx={{color: widthMoved === -widthToMove*(catalogue.length-1) ? greyColor[400] : greyColor[950]}} />
          </IconButton>
        </Box>
      </Box>
    );
  };