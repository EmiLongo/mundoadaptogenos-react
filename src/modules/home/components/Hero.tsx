import React from "react";
import {
  Box,
  Typography,
  keyframes,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DisplayHeadingL,
  DisplayHeadingXXL,
  Heading1,
  Heading2,
} from "@theme/textStyles";
import { Parallax } from "./Parallax";

import floatingMushroomWebp from "@img/home/hero/floating_mushroom.webp";
import floatingMushroomPng from "@img/home/hero/floating_mushroom.png";
import shadowMushroomWebp from "@img/home/hero/sombra.webp";
import shadowMushroomPng from "@img/home/hero/sombra.png";

// animación del hongo
const floatUpAnimation = keyframes`
  0% {
    transform: translateY(100vh);
  }
  50% {
    transform: translateY(0) translateX(0) rotate(0deg);
    transform-origin: 50% 50%;
  }
  // 56% {
  //   transform: translateY(0) translateX(-30px) rotate(-6deg);
  // }
  // 65% {
  //   transform: translateY(0) translateX(15px) rotate(6deg);
  // }
  74% {
    transform: translateY(0) translateX(-15px) rotate(-6deg);
  }
  83% {
    transform: translateY(0) translateX(9px) rotate(3deg);
  }
  92% {
    transform: translateY(0) translateX(-6px) rotate(-1.2deg);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
    transform-origin: 50% 50%;
  }
`;

// Animación para la sombra
const fadeInAnimation = keyframes`
  0% {
    transform: scale(0.5);
  }
  60% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
`;

// Animación para el fondo
// const rotateAnimation = keyframes`
//   0% {
//     transform: rotate(-180deg);
//   }
//   100% {
//     transform: rotate(0deg);
//   }
// `;

//Animación para la frase xl
const translateToRightAnimation = keyframes`
  0% {
    transform: translateX(-50%);
    opacity: 0.5
  }
  100% {
    transform: translateX(0);
    opacity: 1
  }
`;

//Animación para la frase l
const translateToLeftAnimation = keyframes`
  0% {
    transform: translateX(50%);
    opacity: 0.5
  }
  100% {
    transform: translateX(0);
    opacity: 1
  }
`;

export const Hero: React.FC = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  return (
    <>
      {/* titulo para el SEO, no se muestra */}
      <Typography
        variant="h1"
        component="h1"
        sx={{
          color: "transparent",
          fontSize: "0.1rem",
          position: "absolute",
          top: "-100%",
          left: "-100%",
        }}
      >
        Venta de Extracción Hongos Adaptógenos, Melena de León, Cordyceps
        Militaris, Reishi, Cola de Pavo, Màxima Pureza
      </Typography>
      <Box
        sx={{
          height: { xs: "80vh", md: "75vh", lg: "75vh" },
          width: "100%",
          marginBottom: { xs: "1rem", md: "4rem" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: { xs: "212px", sm: "253px", md: "278px", xl: "400px" },
            zIndex: 10,
            position: "relative",
            // animación del hongo
            animation: `${floatUpAnimation} 1.5s ease-out`,
          }}
        >
          <Box
            component="picture"
            sx={{
              width: "100%",
              zIndex: 10,
            }}
          >
            <source srcSet={floatingMushroomWebp} type="image/webp" />
            <Box
              component="img"
              src={floatingMushroomPng}
              alt="Hongo Flotando"
              loading="lazy"
              decoding="async"
              width="100%"
            />
          </Box>

          <Box
            sx={{
              width: { xs: "212px", sm: "253px", md: "278px", xl: "400px" },
              zIndex: 10,
              position: "absolute",
              bottom: "-30%",
              // Animación para la sombra (aparece después del hongo)
              animation: `${fadeInAnimation} 1.4s ease-out`,
            }}
          >
            <Box
              component="picture"
              sx={{
                width: "100%",
                zIndex: 10,
              }}
            >
              <source srcSet={shadowMushroomWebp} type="image/webp" />
              <Box
                component="img"
                src={shadowMushroomPng}
                alt="Sombra del Hongo"
                loading="lazy"
                decoding="async"
                width="100%"
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: { xs: "335px", sm: "545px", md: "670px", lg: "1050px" },
            maxWidth: "1050px",
            height: {
              xs: "400px",
              sm: "400px",
              md: "340px",
              lg: "360px",
              xl: "400px",
            },
            transform: {
              xs: "translateY(0)",
              sm: "translateY(40px)",
              md: "translateY(-5px)",
              lg: "translateY(0)",
              xl: "translateY(-40px)",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 7,
          }}
        >
          <Box sx={{ animation: `${translateToRightAnimation} 0.7s ease-out` }}>
            {isMobile ? (
              <>
                <Heading1 sx={{ width: "100%", textAlign: "left" }}>
                  Tu salud integral
                </Heading1>
                <Heading1 sx={{ width: "100%", textAlign: "left" }}>
                  en equilibrio
                </Heading1>
              </>
            ) : isTablet ? (
              <>
                <DisplayHeadingL sx={{ width: "100%", textAlign: "left" }}>
                  Tu salud integral en
                </DisplayHeadingL>
                <DisplayHeadingL sx={{ width: "100%", textAlign: "left" }}>
                  equilibrio
                </DisplayHeadingL>
              </>
            ) : (
              <>
                <DisplayHeadingXXL sx={{ width: "100%", textAlign: "left" }}>
                  Tu salud integral
                </DisplayHeadingXXL>
                <DisplayHeadingXXL sx={{ width: "100%", textAlign: "left" }}>
                  en equilibrio
                </DisplayHeadingXXL>
              </>
            )}
          </Box>
          {isMobile || isTablet ? (
            <Heading2
              sx={{
                width: "100%",
                textAlign: "right",
                animation: `${translateToLeftAnimation} 0.7s ease-out`,
              }}
            >
              De manera natural.
            </Heading2>
          ) : (
            <Heading1
              sx={{
                width: "100%",
                textAlign: "right",
                animation: `${translateToLeftAnimation} 0.7s ease-out`,
                paddingRight: {xs: 0, lg:"3rem", xl: 0}
              }}
            >
              De manera natural.
            </Heading1>
          )}
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            boxShadow:
              "inset 0px 10px 10px 0px rgba(41, 23, 17, 0.2), inset 0px -10px 10px 0px rgba(41, 23, 17, 0.2)",
            position: "absolute",
            zIndex: 100,
          }}
        />
        <Parallax />
      </Box>
    </>
  );
};
