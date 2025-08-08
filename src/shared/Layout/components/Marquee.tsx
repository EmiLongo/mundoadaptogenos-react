// src\shared\Layout\components\Marquee.tsx
import React, { useRef, useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { greyColor } from "@theme/theme";
import { navBarDesktopInfoHeight } from "../utils/info";
import { Caption } from "@/theme/textStyles";

export const Marquee: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [animationDuration, setAnimationDuration] = useState(20);
  const textRef = useRef<HTMLDivElement>(null);

  const marqueeText = "20% OFF POR TRANSFERENCIA  |  3 Y 6 CUOTAS SIN INTERÉS CON TODOS LOS BANCOS  |  ENVÍOS GRATIS (SOLO ARGENTINA)";

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      // Calculamos duración basada en el ancho del texto (más texto = más tiempo)
      const duration = Math.min(15, textWidth / 50); // mínimo 15s
      setAnimationDuration(duration);
    }
  }, [marqueeText]);

  return (
    <>
      {isMobile && (
        <Box
          sx={{
            height: navBarDesktopInfoHeight,
            overflow: "hidden",
            backgroundColor: greyColor[200],
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            ref={textRef}
            sx={{
              display: "flex",
              whiteSpace: "nowrap",
              animation: `marquee ${animationDuration}s linear infinite`,
              willChange: "transform", // Optimización para performance
            }}
          >
            {/* Duplicamos el contenido para continuidad perfecta */}
            <Box sx={{ display: "flex", paddingRight: "4rem" }}>
              <Caption sx={{ textWrap: "nowrap" }}>
                {marqueeText}
              </Caption>
            </Box>
            <Box sx={{ display: "flex", paddingRight: "4rem" }}>
              <Caption sx={{ textWrap: "nowrap" }}>
                {marqueeText}
              </Caption>
            </Box>
          </Box>

          <style>
            {`
              @keyframes marquee {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
            `}
          </style>
        </Box>
      )}
    </>
  );
};