// src/modules/contact/page/ContactPage.tsx
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BodyM, BodyS, Heading3, Heading5 } from "@theme/textStyles";
import { brownColor, greyColor, paddingPage, shadow } from "@theme/theme";
import contactBg from "@img/contact/fondo-contacto.webp";
import logoHorizontal from "@img/contact/logo-horizontal.svg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import InstagramIcon from "@img/icons/RiInstagramFill.svg";
import FacebookIcon from "@img/icons/RiFacebookCircleFill.svg";
import { ContactForm } from "../components/ContactForm";
import { HeadingPage } from "@/shared/components/HeadingPage";

export const ContactPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${contactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        ...paddingPage,
      }}
    >
      <HeadingPage text="Página de Contacto con nuestro equipo" />
      <BodyS sx={{ paddingTop: "24px", paddingBottom: "32px" }}>
        Inicio / Contacto
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
        {/* imagen */}
        <Box
          component="img"
          src={logoHorizontal}
          alt="Nuestro Logo con texto horizontal"
          sx={{ width: { xs: "253px", sm: "333px" } }}
        />
        {/* tarjetas de contacto */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row-reverse", md: "row" },
            gap: "16px",
          }}
        >
          {isMobile ? (
            // 2 tarjetas
            <>
              <Box
                sx={{
                  backgroundColor: greyColor[50],
                  borderRadius: "8px",
                  padding: "24px 16px",
                  width: { xs: "90vw", sm: "55vw" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  ...shadow.card,
                }}
              >
                <Heading5 sx={{ textAlign: "center", marginBottom: "8px" }}>
                  Escribinos
                </Heading5>
                <Box>
                  <Box
                    component="a"
                    href="https://wa.me/5493412667096?text=🍄%20Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20hongos%20adaptógenos."
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <WhatsAppIcon sx={{ color: greyColor[950] }} />
                    <BodyS> +54 9 341 266-7096</BodyS>
                  </Box>
                  <Box
                    component="a"
                    href="mailto: mundoadaptogenos@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <EmailOutlinedIcon sx={{ color: greyColor[950] }} />
                    <BodyS>mundoadaptogenos@gmail.com</BodyS>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: greyColor[50],
                  borderRadius: "8px",
                  padding: "24px 16px",
                  width: { xs: "90vw", sm: "35vw" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  ...shadow.card,
                }}
              >
                <Heading5>Estamos en</Heading5>
                <Box>
                  <BodyS>Sadi Carnot 5952, Rosario.</BodyS>
                  <BodyS>Santa Fe, Argentina.</BodyS>
                  <BodyS>CP 2000</BodyS>
                </Box>
              </Box>
            </>
          ) : (
            // 3 tarjetas
            <>
              <Box
                component="a"
                href="https://wa.me/5493412667096?text=🍄%20Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20hongos%20adaptógenos."
                target="_blank"
                rel="noreferrer"
                sx={{
                  minWidth: {md: "244px", lg: "274px"},
                  flex: 1,
                  padding: "16px 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  backgroundColor: greyColor[50],
                  ...shadow.card,
                }}
              >
                <Box>
                  <WhatsAppIcon sx={{ fontSize: "40px", color: greyColor[600] }}/>
                </Box>
                <Box
                  sx={{
                    height: "36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <BodyM>+54 9 341 266-7096</BodyM>
                </Box>
              </Box>
              <Box
                component="a"
                href="mailto: mundoadaptogenos@gmail.com"
                target="_blank"
                rel="noreferrer"
                sx={{
                  minWidth: "274px",
                  flex: 1,
                  padding: "16px 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  backgroundColor: greyColor[50],
                  ...shadow.card,
                }}
              >
                <Box>
                  <EmailOutlinedIcon sx={{ fontSize: "40px", color: greyColor[600] }}/>
                </Box>
                <Box
                  sx={{
                    height: "36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <BodyM>mundoadaptogenos@gmail.com</BodyM>
                </Box>
              </Box>
              <Box
                sx={{
                  minWidth: {md: "244px", lg: "274px"},
                  flex: 1,
                  padding: "16px 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  backgroundColor: greyColor[50],
                  ...shadow.card,
                }}
              >
                <Box>
                  <FmdGoodOutlinedIcon
                    sx={{ fontSize: "40px", color: greyColor[600] }}
                  />
                </Box>
                <Box
                  sx={{
                    height: "36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <BodyM>Sadi Carnot 5952, Rosario.</BodyM>
                  <BodyM>Santa Fe, AR. CP 2000</BodyM>
                </Box>
              </Box>
            </>
          )}
        </Box>
        {/* redes sociales */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            justifyContent: "center",
            marginY: {xs:"32px", md: "0"}
          }}
        >
          {isMobile ? (
            <Heading5 sx={{ textAlign: "center", color: brownColor[950] }}>
              Seguinos en redes
            </Heading5>
          ) : (
            <Heading3 sx={{ textAlign: "center", color: brownColor[950] }}>
              Seguinos en redes
            </Heading3>
          )}
          <Box sx={{ display: "flex", gap: "16px", justifyContent: "center", }}>
            <Box
              component="a"
              href="https://www.instagram.com/mundoadaptogenos/"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: brownColor[950],
              }}
            >
              <Box component="img" src={InstagramIcon} width={32} />
            </Box>
            <Box
              component="a"
              href="https://www.facebook.com/mundoadaptogenos/"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: brownColor[950],
              }}
            >
              <Box component="img" src={FacebookIcon} width={32} />
            </Box>
          </Box>
        </Box>
        {/* formulario */}
        <ContactForm />
      </Box>
    </Box>
  );
};
