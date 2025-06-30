// src/theme/textStyles.tsx
import { styled, Theme, Typography, TypographyProps } from '@mui/material';

export const defaultFonts = {
  letter: {
    wide: 1.3,
    normal: 0.3,
  },
  family: {
    titulos: "Exo, Fira Sans Extra Condensed, arial, calibri, sans-serif",
    textos: "Josefin Sans, Jost, arial, calibri, sans-serif",
  },
};

export const customFonts = {
  space: {
    small: "1rem",
    medium: {xs: "1.5rem", md: "2rem"},
    large: "3rem",
  },
  shadow: {
    titulos: "4px 4px 4px rgba(0, 0, 0, 0.6)",
  },
}

export const defaultParagraph = () => ({
  fontFamily: defaultFonts.family.textos,
  fontWeight: "normal",
  letterSpacing: defaultFonts.letter.normal,
  color: "inherit",
  lineHeight: 1.3,
});

export const defaultCTA = () => ({
  fontFamily: defaultFonts.family.textos,
  fontWeight: "normal",
  letterSpacing: defaultFonts.letter.wide,
  color: "inherit",
});

export const defaultTitle = () => ({
  fontFamily: defaultFonts.family.titulos,
  letterSpacing: defaultFonts.letter.normal,
  fontWeight: 500,
  color: "inherit",
  // lineHeight: 1.2,
});

export const inputAdvice = () => ({
  fontFamily: defaultFonts.family.textos,
  fontSize: "0.75rem", // 12px
  color: "inherit",
});

// Helper para recibir sx extra

const responsiveFontSize = (fontSizes: { xxl?: string; xl?: string; lg?: string; md?: string; sm?: string, xs?: string }) => (theme: Theme) => ({
  fontSize: fontSizes.xl,

  [theme.breakpoints.up(2000)]: { fontSize: fontSizes.xxl },
  [theme.breakpoints.down('xl')]: { fontSize: fontSizes.lg },
  [theme.breakpoints.down('lg')]: { fontSize: fontSizes.md },
  [theme.breakpoints.down('md')]: { fontSize: fontSizes.sm },
  [theme.breakpoints.down('sm')]: { fontSize: fontSizes.xs },
});

// TITLES
export const  TitleHero = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultTitle(),
  ...responsiveFontSize({ xxl: '6rem', xl: '4.75rem', lg: '4.2rem', md: '4rem', sm: '3.75rem', xs: '3.75rem' })(theme), // 60px
  fontWeight: 600,
  lineHeight: 1.1,
  textShadow: customFonts.shadow.titulos,
}))
export const  TitleHero2 = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultTitle(),
  ...responsiveFontSize({ xxl: '3.27rem', xl: '2.45rem', lg: '2.23rem', md: '2.12rem', sm: '2rem', xs: '2rem' })(theme), // 60px
  fontWeight: 600,
  // lineHeight: 1.1,
}))

export const TitleXL = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultTitle(),
  ...responsiveFontSize({ xxl: '3rem', xl: '2.25rem', lg: '2.05rem', md: '1.95rem', sm: '1.85rem', xs: '1.85rem' })(theme), // 36px
  textTransform: "uppercase",
}));

export const Title1 = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultTitle(),
  ...responsiveFontSize({ xl: '1.75rem', lg: '1.59rem', md: '1.52rem', sm: '1.44rem', xs: '1.44rem' })(theme), // 24px
  textWrap: "wrap",
  textTransform: "uppercase",
}));

export const Title2 = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultTitle(),
  ...responsiveFontSize({ xl: '1.5rem', lg: '1.375rem', md: '1.325rem', sm: '1.3rem', xs: '1.3rem' })(theme), // 20px
  textWrap: "wrap",
  textTransform: "uppercase",
}));

export const Title3 = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultTitle(),
  ...responsiveFontSize({ xl: '1.25rem', lg: '1.15rem', md: '1.1rem', sm: '1.05rem', xs: '1.05rem' })(theme), // 16px
  fontWeight: 'normal',
  textWrap: "wrap",
  textTransform: "uppercase",
}));

// CTA
export const CallToAction = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultCTA(),
  ...responsiveFontSize({ xl: '1.25rem', lg: '1.15rem', md: '1.105rem', sm: '1.07rem', xs: '1.07rem' })(theme), // 20px
  fontWeight: 600,
  textTransform: "uppercase",
}));
// SUBTITLES

export const SubtitleXL = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultParagraph(),
  ...responsiveFontSize({ xl: "1.5rem", lg: "1.375rem", md: "1.32rem", sm: "1.27rem", xs: "1.27rem"})(theme), // 24px
  textWrap: "wrap",
}));

export const SubtitleBold = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultParagraph(),
  fontWeight: 600,
  ...responsiveFontSize({ xl: '0.89rem', lg: '0.8125rem', md: '0.78rem', sm: '0.75rem', xs: '0.75rem' })(theme), // 14px
}));
export const Subtitle = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultParagraph(),
  ...responsiveFontSize({ xl: '0.89rem', lg: '0.8125rem', md: '0.78rem', sm: '0.75rem', xs: '0.75rem' })(theme), // 14px
  textWrap: "wrap",
}));

// BUTTON MINI
export const ButtonMini = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultParagraph(),
  textTransform: "uppercase",
  color: theme.palette.secondary.main,
  ...responsiveFontSize({ xl: '0.687rem', lg: '0.625rem', md: '0.5625rem', sm: '0.5rem' })(theme), // 10px
}));

// PARAGRAPHS
export const Text1 = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultParagraph(),
  ...responsiveFontSize({ xs: '1.15rem', md: '1.21rem', lg: '1.28rem', xl: '1.4rem' })(theme),
  textWrap: "wrap",
}));

export const Text2 = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultParagraph(),
  ...responsiveFontSize({ xs: '1.1rem', md: '1.1rem', lg: '1.2rem', xl: '1.3rem' })(theme),
  textWrap: "wrap",
}));

export const Text3 = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultParagraph(),
  ...responsiveFontSize({ xs: '0.8rem', md: '1rem', lg: '1.1rem', xl: '1.2rem' })(theme),
  textWrap: "wrap",
}));

export const ParagraphLight = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultParagraph(),
  color: theme.palette.background.paper,
  textWrap: "wrap",
}));

export const ParagraphDetails = styled((props: TypographyProps) => <Typography {...props} />)(() => ({
  ...defaultParagraph(),
  fontSize: "0.625rem", // 10px
  textWrap: "wrap",
}));

export const TextBoxFill = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...defaultParagraph(),
  ...responsiveFontSize({ xl: '0.89rem', lg: '0.8125rem', md: '0.78rem', sm: '0.75rem', xs: '0.75rem' })(theme), // 14px
}));

export const TextBox = styled((props: TypographyProps) => <Typography {...props} />)(() => ({
  ...defaultParagraph(),
  fontSize: "0.812rem", // 13px
}));

// INPUTS
export const InputAdvice = styled((props: TypographyProps) => <Typography {...props} />)(() => ({
  ...inputAdvice(),
}));

export const InputError = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  ...inputAdvice(),
  color: theme.palette.error.main,
}));




import React from "react";

interface Props {
  children: React.ReactNode
  sx?: object
  id?: string
}
export const SectionTitle: React.FC<Props> = ({ children, sx, id }) => {
  return (
    <Title1
      id={id}
      sx={{
        marginTop: {xs:"3rem", lg:"3rem"},
        marginBottom: "1rem",
        textAlign: "center",
      ...sx }}>
      { children }
    </Title1>
  )
};

export const SectionSubTitle: React.FC<Props> = ({ children, sx, id }) => {
  return (
    <Text1
    id={id}
    sx={{
      textAlign: "center", 
      marginBottom: "2rem",
      paddingX: {xs: "2rem", md: "unset"}, 
      maxWidth: {xs: "unset", md: "600px"}, 
      textWrap: "balance",
      ...sx}}
    >
      { children }
    </Text1>
  )
}