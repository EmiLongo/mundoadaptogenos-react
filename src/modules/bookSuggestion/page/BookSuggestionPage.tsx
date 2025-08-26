// src/modules/bookSuggestion/page/BookSuggestionPage.tsx
import React from "react"
import { HeadingPage } from "@shared/components/HeadingPage"
import { BodyS, Heading2 } from "@theme/textStyles"
import { greyColor, paddingPage } from "@theme/theme"
import { Box } from "@mui/material"
import suggestionBg from "@img/book-suggestion/fondo-libro-quejas.webp"
import { BookSuggestionsForm } from "../components/BookSuggestionsForm"

export const BookSuggestionPage: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${suggestionBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        marginBotton: {xs: "5rem", sm:"3rem"},
        ...paddingPage,
      }}
    >
      <HeadingPage text="Página de Libro de Quejas Online" />
      <BodyS sx={{ paddingTop: "24px", paddingBottom: "32px" }}>
        Inicio / Libro de Quejas Online
      </BodyS>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "16px", sm: "32px" },
          alignItems: "center",
          color: greyColor[950],
        }}
      >
        <Heading2 sx={{textAlign: "center"}}>LIBRO DE QUEJAS, SUGERENCIAS Y RECLAMOS</Heading2>
        <BookSuggestionsForm />
      </Box>
    </Box>
  )
}