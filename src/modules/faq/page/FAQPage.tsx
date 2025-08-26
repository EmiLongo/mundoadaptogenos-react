// src/modules/faq/page/FAQPage.tsx
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { greyColor, paddingPage } from "@/theme/theme";
import { HeadingPage } from "@/shared/components/HeadingPage";
import { BodyS, Heading2 } from "@/theme/textStyles";
import faqBg from "@img/faq/fondo-faq.webp";
import { faqQuestions } from "../utils/questions";
import { QuestionsDesktop } from "../components/QuestionsDesktop";
import { QuestionsMobile } from "../components/QuestionsMobile";
export const FAQPage : React.FC = () =>{

  const theme = useTheme();
  const isMobileMini = useMediaQuery(theme.breakpoints.down('sm'));
  return(
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${faqBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBotton: "5rem",
        ...paddingPage,
        paddingBottom: "64px",
      }}
    >
      <HeadingPage text="Página de Preguntas Frecuentes de los Hongos Adaptógenos y nuestros servicios" />
      <BodyS sx={{ paddingTop: "24px", paddingBottom: "32px" }}>
      Inicio / Preguntas Frecuentes
      </BodyS>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "64px",
          alignItems: "center",
          color: greyColor[950],
        }}
      >
        {faqQuestions.map((faq, index) => (
          <Box key={`faq-${index}-${faq.sectionTitle.split(" ").concat("_")}`}>
            <Heading2 sx={{textAlign: "center", marginBottom: "20px"}}>{faqQuestions[index].sectionTitle}</Heading2>
            {isMobileMini 
            ? <QuestionsMobile questions={faq.questions} /> 
            : <QuestionsDesktop questions={faq.questions} />}
          </Box>
        ))
        }
      </Box>
    </Box>
  )
}