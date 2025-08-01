// src/modules/mushroom-type/components/Benefits.tsx
import React from "react";
import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import { BodyM, BodyS, Heading2, Heading3, Heading4 } from "@theme/textStyles";
import { greyColor, paddingPage, shadow } from "@theme/theme";
import { MushroomByBenefits } from "@modules/mushroom-type/utils/MushroomByBenefits";


const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  borderRadius: "8px",
  background: greyColor[100],
  minWidth: "58px",
  width: "58px",
  aspectRatio: 1,
  ...shadow.small,
})

interface IBenefitsComponent {
  sectionsID: number[];

}

export const ProductBenefits: React.FC<IBenefitsComponent> = ({
  sectionsID
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const allMushrooms = MushroomByBenefits.filter(mushroom => 
    mushroom.productSection.some(section => sectionsID.includes(section))
  );
  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "40px",
        ...paddingPage
      }}
    >
      <Box sx={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isMobile
          ? <Heading3 sx={{textAlign: "center"}}>Beneficios para la salud</Heading3>
          : <Heading2 sx={{textAlign: "center"}}>Beneficios para la salud</Heading2>}
      </Box>
      {allMushrooms.length === 1 &&
        <Box key={`benefit-${allMushrooms[0].title.split(" ").join("_")}`}
          sx={{display: "flex", flexDirection: "column", gap: "8px"}}
        >
          <Heading4>{allMushrooms[0].title}</Heading4>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: {sm: "repeat(2, 250px)"},
            gap: "10px",
            columnGap: "20px"
          }}>
            {allMushrooms[0].benefits.map((benefit, index) => (
              <Box
                key={`benefit-${index}`}
                sx={{ 
                  width: "100%",
                  height: "58px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <StyledBox>
                  <Box
                    component="img"
                    width= "38px"
                    sx={{ aspectRatio: 1 }}
                    src={benefit.icon as string}
                  />
                </StyledBox>
                {isMobile ? (
                  <BodyM>{benefit.description}</BodyM>
                ) : (
                  <BodyS>{benefit.description}</BodyS>
                )}
              </Box>
            ))}

          </Box>
        </Box>
      } 
      {allMushrooms.length > 1 && 
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
            gap: "10px",
          }}
        >
          {allMushrooms.map(mushroom => ( 
            <Box key={`benefit-${mushroom.title.split(" ").join("_")}`}
              sx={{display: "flex", flexDirection: "column", gap: "8px"}}
            >
              <Heading4>{mushroom.title}</Heading4>
              {mushroom.benefits.map((benefit, index) => (
              <Box
                key={`benefit-${index}`}
                sx={{ 
                  width: "100%",
                  height: "58px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <StyledBox>
                  <Box
                    component="img"
                    width= "38px"
                    sx={{ aspectRatio: 1 }}
                    src={benefit.icon as string}
                  />
                </StyledBox>
                {isMobile ? (
                  <BodyM>{benefit.description}</BodyM>
                ) : (
                  <BodyS>{benefit.description}</BodyS>
                )}
              </Box>
            ))}
            </Box>
          ))}
        </Box>
      }
    </Box>
  );
};
