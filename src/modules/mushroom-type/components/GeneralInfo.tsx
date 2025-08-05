// src/modules/mushroom-type/components/GeneralInfo.tsx
import React from "react";
import { Box } from "@mui/material";
import { BodyL, BodyM, Heading2, Heading3, Heading4 } from "@/theme/textStyles";
import { IMushroomDetails } from "@shared/types/MushroomTypes";
import { greyColor, shadow } from "@theme/theme";

interface IGeneralInfoComponent {
  isMobile: boolean;
  mushroom: IMushroomDetails;
}
export const GeneralInfo: React.FC<IGeneralInfoComponent> = ({
  mushroom,
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
        gap: "16px",
        paddingX: {
          xs: "1rem",
          sm: "2rem",
          md: "4rem",
          lg: "5rem",
          xl: "8rem",
        },
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
          <Heading3>INFORMACIÓN GENERAL</Heading3>
        ) : (
          <Heading2>INFORMACIÓN GENERAL</Heading2>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "16px",
          alignItems: "stretch",
        }}
      >
        {/* PRIMERA COLUMNA */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: "16px",
            width: { xs: "100%", md: "47%", lg: "38%" },
            borderRadius: "8px",
            backgroundColor: greyColor[100],
            overflow: "hidden",
            ...shadow.small,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: { xs: "300px", md: "400px", xl: "500px" },
              overflow: "hidden",
              backgroundImage: `url(${mushroom.imgDescription})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <Box
            sx={{
              paddingX: { xs: "16px", sm: "24px", md: "40px" },
              paddingBottom: "32px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {isMobile ? (
              <Box sx={{
                display: "flex",
                flexDirection: "column"
              }}>

                <Heading4 sx={{ marginY: "8px" }}>
                  CARACTERÍSTICAS FÍSICAS
                </Heading4>
                {mushroom.description.map((paragraph, index) => (
                  <BodyM key={`description-paragraph-${index}`}>{paragraph}</BodyM>
                ))}
              </Box>
            ) : (
              <>
                <Heading2 sx={{ marginY: "8px" }}>
                  CARACTERÍSTICAS FÍSICAS
                </Heading2>
                {mushroom.description.map((paragraph, index) => (
                  <BodyL key={`description-paragraph-${index}`}>{paragraph}</BodyL>
                ))}
              </>
            )}
          </Box>
        </Box>
        {/* SEGUNDA COLUMNA */}
        <Box
          sx={{
            display: "flex",
            flex: "1",
            flexDirection: "column",
            gap: "16px",
            width: { xs: "100%", md: "47%", lg: "60%" },
            borderRadius: "8px",
            backgroundColor: greyColor[100],
            overflow: "hidden",
            ...shadow.small,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "300px", md: "400px", xl: "500px" },
              overflow: "hidden",
              backgroundImage: `url(${mushroom.imgHarvest})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <Box
            sx={{
              paddingX: { xs: "16px", sm: "24px", md: "40px" },
              paddingBottom: "32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isMobile ? (
              <Box sx={{
                display: "flex",
                flexDirection: "column"
              }}>
                <Heading4 sx={{ marginY: "8px" }}>CULTIVO</Heading4>
                {mushroom.harvest.map((paragraph, index) => (
                  <BodyM key={`harvest-paragraph-${index}`}>{paragraph}</BodyM>
                ))}
              </Box>
            ) : (
              <>
                <Heading2 sx={{ marginY: "8px" }}>CULTIVO</Heading2>
                {mushroom.harvest.map((paragraph, index) => (
                  <BodyL key={`harvest-paragraph-${index}`}>{paragraph}</BodyL>
                ))}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
