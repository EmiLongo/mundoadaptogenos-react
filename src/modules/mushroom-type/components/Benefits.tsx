// src/modules/mushroom-type/components/Benefits.tsx
import React from "react";
import { Heading2, Heading3, Heading5 } from "@theme/textStyles";
import { greenColor, greyColor, shadow } from "@theme/theme";
import { Box } from "@mui/material";
import { IBenefit } from "./types";

interface IBenefitsComponent {
  benefits: IBenefit[];
  isMobile: boolean;
}

export const Benefits: React.FC<IBenefitsComponent> = ({
  benefits,
  isMobile,
}) => {
  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: greyColor[200],
        paddingY: "40px",
      }}
    >
      <Box sx={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isMobile
          ? <Heading3 sx={{textAlign: "center"}}>BENEFICIOS DE SU CONSUMO</Heading3>
          : <Heading2 sx={{textAlign: "center"}}>BENEFICIOS DE SU CONSUMO</Heading2>}
      </Box>
      <Box
        sx={{
          display: {xs: "grid", sm: "flex"},
          gridTemplateColumns: {xs: "1fr 1fr", sm: "unset"},
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {benefits.map((benefit) => (
          <Box sx={{ 
            width: { xs: "135px", md: "200px" },
            height: {xs:"180px", md: "235px"},
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px"

          }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                borderRadius: "40px",
                background: greenColor[300],
                width: { xs: "80px", md: "120px" },
                aspectRatio: 1,
                ...shadow.small,
              }}
            >
              <Box
                component="img"
                width={isMobile ? "50px" : "80px"}
                sx={{ aspectRatio: 1 }}
                src={benefit.icon as string}
              />
            </Box>
            {isMobile ? (
              <Heading5 sx={{textAlign: "center", paddingX: "5px"}}>{benefit.description}</Heading5>
            ) : (
              <Heading3 sx={{textAlign: "center", paddingX: "20px"}}>{benefit.description}</Heading3>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
