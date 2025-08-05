// src\modules\products\components\ProductsBenefitMobile.tsx
import React, { useState } from "react"
import { Box, Collapse, styled } from "@mui/material"
import { brownColor, greyColor, paddingPage, shadow } from "@theme/theme"
import { BodyM, ButtonM, Heading3, Heading4 } from "@theme/textStyles"
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
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

export const ProductsBenefitMobile: React.FC<IBenefitsComponent> = ({ sectionsID }) => {
  const [collapseBenefits, setCollapseBenefits] = useState<boolean>(false)
  const allMushrooms = MushroomByBenefits.filter(mushroom => 
    mushroom.productSection.some(section => sectionsID.includes(section))
  );

  const toogleCollapse = () => {
    setCollapseBenefits(!collapseBenefits)
  }
  return (
    <Box
    component="article"
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: "40px",
      gap: "16px",
      ...paddingPage
    }}
  >
    <Heading3>Beneficios para la salud</Heading3>
    <Box>
      <Box sx={{display: "flex", gap: "4px", color: brownColor[950], alignItems: "center", paddingLeft: "12px"}}
        onClick={toogleCollapse}
      >
        <KeyboardArrowDownOutlinedIcon sx={{
          transform: collapseBenefits ? "rotate(180deg)" : "rotate(0)",
          transition: "all 0.6s ease-out"
        }}/>
        <ButtonM sx={{color: "inherit"}}>{collapseBenefits ? "LEER MENOS" : "LEER MÁS"}</ButtonM>
      </Box>
      <Collapse in={collapseBenefits}>
      {allMushrooms.map(mushroom => ( 
            <Box key={`benefit-${mushroom.title.split(" ").join("_")}`}
              sx={{display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px"}}
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
                <BodyM>{benefit.description}</BodyM>
              </Box>
            ))}
            </Box>
          ))}
      </Collapse>
    </Box>
  </Box>  
  )
}