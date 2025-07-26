// src/modules/mushroom-type/components/Bioactive.tsx
import React from "react";
import { Box } from "@mui/material";
import { Heading2, Heading3, Heading5 } from "@/theme/textStyles";
import bioactiveBg from "@img/mushroom-types/textura-fondo-bioactivos.png";
import { paddingPage, shadow } from "@theme/theme";

interface IBioactiveComponent {
  isMobile: boolean;
  bioactive: string[];
}
export const Bioactive: React.FC<IBioactiveComponent> = ({
  bioactive,
  isMobile,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingY: "40px",
        gap: "32px",
        ...paddingPage
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60px",
        }}
      >
        {isMobile ? (
          <Heading3 sx={{ textAlign: "center" }}>
            COMPUESTOS BIOACTIVOS Y SUS EFECTOS EN LA SALUD
          </Heading3>
        ) : (
          <Heading2 sx={{ textAlign: "center" }}>
            COMPUESTOS BIOACTIVOS Y SUS EFECTOS EN LA SALUD
          </Heading2>
        )}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" },
          gap: { xs: "10px", md: "24px" },
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        {bioactive.map((compound) => (
          <Box
            sx={{
              width: { xs: "100%", md: "200px", lg: "300px" },
              height: "80px",
              borderRadius: "40px",
              backgroundImage: `url(${bioactiveBg})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
              ...shadow.small,
            }}
          >
            {isMobile ? (
              <Heading5 sx={{ textAlign: "center", zIndex: 10 }}>
                {compound}
              </Heading5>
            ) : (
              <Heading3 sx={{ textAlign: "center", zIndex: 10 }}>
                {compound}
              </Heading3>
            )}
            <Box
              sx={{
                background: "#FCEED8",
                position: "absolute",
                inset: 0,
                opacity: 0.5,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
