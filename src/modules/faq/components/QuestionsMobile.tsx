// src/modules/faq/components/QuestionsMobile.tsx
import React, { useState } from "react";
import { Box, Collapse, IconButton, keyframes } from "@mui/material";
import { brownColor, greyColor, paddingPage } from "@theme/theme";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { BodyM, Heading4 } from "@/theme/textStyles";
import { Question } from "@/types/FaqTypes";

// Animación para el texto
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

interface IQuestionsMobile {
  questions: Question[];
}

export const QuestionsMobile: React.FC<IQuestionsMobile> = ({
  questions,
}) => {
  const [indexSelected, setIndexSelected] = useState<number | null>(0);

  const handleClick = (index: number) => {
    if(indexSelected === index){
      setIndexSelected(null)
      return
    }
    setIndexSelected(index)
  }
  return (
    <Box
    component="section"
    sx={{
      width: "100%",
      background: greyColor[200],
      ...paddingPage,
    }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: {xs: "100%", md:"47%", lg: "39%"},
        paddingY: "24px",
      }}>
        {questions.map((question, index) => (
          <>
          <Box 
          key={`question-${index}-${question.title.split(" ").join("_")}`} 
          sx={{
            paddingRight: "16px",
            width: "100%",
            display: "flex", 
            paddingY: "8px", 
            paddingX: "16px", 
            alignItems: "center", 
            justifyContent: "space-between",
            background: indexSelected === index ? greyColor[50] : "transparent",
            borderTop: index === 0 ? `1px solid ${greyColor[400]}` : 'none',
            borderBottom: `1px solid ${greyColor[400]}`,
            cursor: "pointer",
            transition: "all 0.3s ease-out"
          }}
          onClick={() => handleClick(index)}
          >
          <Heading4
          sx={{
            color: indexSelected === index ? brownColor[800] : greyColor[950],
            textDecoration: indexSelected === index ? "underline" : "none",
            transition: "all 0.3s ease-out"
          }}
          >
          {question.title}
          </Heading4>
          <IconButton sx={{
            border: "none",
            cursor: "pointer",
            "&:hover": {
              background: "transparent",
            },
          }}>
            <ArrowDropDownIcon 
            sx={{
              transform: indexSelected === index ? "rotate(180deg)" : "rotate(0)",
              transition: "all 0.3s ease-out"
            }}
            />
          </IconButton>
        </Box>
        <Collapse 
          in={indexSelected === index}
        >
          <Box
            key={`questions-info-${indexSelected}`}
            sx={{
              padding: "16px", 
              display: "flex", 
              flexDirection: "column", 
              gap: "8px",
              borderBottom: `1px solid ${greyColor[400]}`,
            }}
            >
            {question.description.map(( answer, index )=> (
              <BodyM key={`effect-description-${index}`} sx={{animation: `1s ${fadeInAnimation} ease-out`}}>{answer}</BodyM>))
            }
          </Box>
        </Collapse>
        </>
        ))}
      </Box>
    </Box>
  )
}