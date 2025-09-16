// src\modules\products\components\ProductsBenefitMobile.tsx
import React, { useState } from "react"
import { Box, Collapse, styled } from "@mui/material"
import { brownColor, greyColor, paddingPage, shadow } from "@theme/theme"
import { BodyM, ButtonM, Heading3, Heading4 } from "@theme/textStyles"
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { MushroomByBenefits } from "@modules/mushroom-type/utils/MushroomByBenefits";
import { ISection } from "@/types/ProductTypes";

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
  sections: ISection[];
}

export const ProductsBenefitMobile: React.FC<IBenefitsComponent> = ({ sections }) => {
  const [collapseBenefits, setCollapseBenefits] = useState<boolean>(false)

  const activeSectionSlugs = sections
    .filter(section => section.is_active)
    .map(section => section.slug);
  
  const allMushrooms = MushroomByBenefits.filter(mushroom => 
    activeSectionSlugs.includes(mushroom.productSectionSlug)
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