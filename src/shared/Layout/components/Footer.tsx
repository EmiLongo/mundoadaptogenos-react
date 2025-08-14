import React from "react";
import {
  Box,
  List,
  Container,
} from "@mui/material";

import inpulseLogo from "@img/inpulse_design_logo_blanco.svg";
import logoContraste from "@img/logo-nombre-vertical-claro.svg";
import { menuItems, subproductsItems } from "../utils/info";
import {
  BodyS,
  CaptionAlt,
  Heading5,
} from "@/theme/textStyles";
import { toast } from "react-toastify";
import { brownColor, greyColor } from "@/theme/theme";
import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from '@img/icons/RiWhatsappFill.svg';
import InstagramIcon from '@img/icons/RiInstagramFill.svg';
import FacebookIcon from '@img/icons/RiFacebookCircleFill.svg';

export const Footer: React.FC = () => {

  const navigate = useNavigate();

  // Función para compartir URL
  const shareURL = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Mundo Adaptógenos",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success("¡URL copiada al portapapeles!"))
        .catch(() => toast.error("No se pudo copiar la URL"));
    }
  };

  return (
    <Box 
      id="footer" 
      component="footer" 
      sx={{
        backgroundColor: brownColor[950],
        color: greyColor[950], 
        borderTop: `1px ${greyColor[400]} solid`,
        paddingTop: "24px"
      }}
    >
      <Container sx={{maxWidth: {xs: "unset", sm:"470px", lg:"950px"}, paddingBottom: "20px"}}>
        <Box
          id="footerContainer"
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {xs: "repeat(2, auto)", sm: "160px 1fr", lg: "1fr 2fr 3fr"},
            gridTemplateRows: {xs:"repeat(4, auto)", sm: "repeat(3, auto)", lg: "repeat(2, auto)"},
            columnGap: {xs: "30px", sm: "2.5rem"},
            rowGap: {xs: "10px", sm:"20px", lg:"0px"},
          }}
        >
          {/* Logo */}
          <Box sx={{display: "flex", 
          justifyContent: {xs:"center", sm:"start",}, 
          alignItems: "flex-start",
          gridArea: {xs:"1 / 1 / 2 / 2", sm:"1 / 1 / 2 / 2", lg:"1 / 1 / 2 / 2"},
          }}>
            <Box
              component={"img"}
              width="80px"
              src={logoContraste}
              alt="Logo Claro Mundo Adaptógenos"
              decoding="async"
              loading="lazy"
              onClick={shareURL}
            />
          </Box>

          {/* Categorías */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              gridArea: {xs: "3 / 1 / 4 / 3", sm: "2 / 1 / 3 / 3", lg:"1 / 3 / 2 / 4"},
            }}
          >
            <Heading5 
            sx={{
              width: "100%",
              textAlign: {xs: "center", lg: "left"},
              color: greyColor[50],
            }}>
              Categorías</Heading5>
            <Box sx={{display: "flex", gap: {xs:"unset", sm:"40px", lg:"20px"}, justifyContent: {xs: "center", sm: "start"}}}>
              <List sx={{
                display: "flex", 
                flexDirection: "column", 
                // flexWrap: {xs: "wrap", md: "nowrap"}, 
                gap:"8px"
              }}>
                {subproductsItems.map((item) => (
                  <Box key={item.text.replace(" ","-")} component={"a"} href={item.path}>
                    <BodyS sx={{ width: {xs: "37vw", sm: "160px", lg:"unset"}, color: greyColor[300], "&:hover":{color: brownColor[400]}}}>
                      {item.text}
                    </BodyS>
                  </Box>
                ))}
              </List>
              {/* Secciones de páginas */}
              <List sx={{
                display: "flex", 
                flexDirection: "column", 
                // flexWrap: {xs: "wrap", md: "nowrap"}, 
                gap:"8px"
              }}>
                {menuItems.map((item) => (
                  <Box key={item.text.replace(" ","-")} component={"a"} href={item.path}>
                    <BodyS sx={{ width: {xs: "37vw", sm: "unset"}, color: greyColor[300], "&:hover":{color: brownColor[400]}}}>
                      {item.text}
                    </BodyS>
                  </Box>
                ))}
              </List>

            </Box>
          </Box>

          {/* Contacto */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: {xs: "start", sm: "start", lg: "start"},
              gap: "8px",
              gridArea: {xs: "1 / 2 / 3 / 3", sm: "1 / 2 / 2 / 3" , lg: "1 / 2 / 2 / 3"},
            }}
          >
            <Heading5 sx={{width: {xs: "unset",sm: "210px", lg:"unset"}, color: greyColor[50],}}>Contáctanos</Heading5>
            <List sx={{width: {xs: "unset",sm: "210px", lg:"unset"},}}>
              <BodyS sx={{ color: greyColor[300]}}>
              Sadi Carnot 5952, Rosario.
              </BodyS>
              <BodyS sx={{ color: greyColor[300]}}>
              Santa Fe, Argentina.
              </BodyS>
              <BodyS sx={{ color: greyColor[300]}}>
              CP 2000
              </BodyS>
              <BodyS sx={{ color: greyColor[300]}}>
              +54 9 341 266-7096
              </BodyS>
              <BodyS sx={{ color: greyColor[300]}}>
              mundoadaptogenos@gmail.com
              </BodyS>
            </List>
          </Box>

          {/* Redes Sociales */}
          <Box sx={{
            display:"flex", 
            justifyContent: {xs: "center", sm: "center", lg: "start"},
            gridArea: {xs: "2 / 1 / 3 / 2", sm: "3 / 1 / 4 / 2" , lg: "2 / 2 / 3 / 3"},
          }}>
            <Box sx={{
              display:"flex", 
              width: {xs: "unset",sm: "210px", lg:"unset"},
              gap: "8px", 
            }}>
            <Box component={"img"} src={WhatsAppIcon} width="24px" sx={{color: "primary.main"}} />
            <Box component={"img"} src={InstagramIcon} width="24px" sx={{color: "primary.main"}} />
            <Box component={"img"} src={FacebookIcon} width="24px" sx={{color: "primary.main"}} />
            </Box>
          </Box>

          {/* Términos y Condiciones */}
          <Box sx={{
            gridArea: {xs: "4 / 1 / 5 / 3", sm: "3 / 2 / 4 / 3" , lg: "2 / 3 / 3 / 4"},
            display: "flex",
            flexDirection: {xs: "column", sm: "row"},
            gap: {xs:"8px", sm:"16px", lg:"24px"},
          }}>
            <OnlyTextButton
              id="bt-footer-terms-conditions"
              onClick={()=>navigate("./terms-and-conditions")}
              type="primaryLigthButton"
              text="Términos y condiciones"
              isFetching={false}
              disabled={false}
              sx={{
                textWrap: "nowrap",
                marginX: {xs: "auto", sm:"unset"}
              }}
            />
            {/* <OnlyTextButton
              id="bt-footer-privacy-policy"
              onClick={()=>navigate("./privacy-policy")}
              type="primaryLigthButton"
              text="Políticas de privacidad"
              isFetching={false}
              disabled={false}
              sx={{
                textWrap: "nowrap"
                }}
                /> */}
          </Box>

        </Box>
        


      </Container>
          {/* service Mark y Trade Mark ℠™ */}
      <Box
        id="footerBottom"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "12px", 
          backgroundColor: brownColor[900], 
          color: greyColor[200],
        }}
      >
        <CaptionAlt sx={{ color: "inherit", textAlign: "center", marginY: "1rem" }}>
          {new Date().getFullYear()} ™ | Desarrollado por
        </CaptionAlt>
        <Box
          component={"a"}
          href="https://inpulse.com.ar"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Box
            component={"img"}
            src={inpulseLogo}
            alt="Logo Inpulse Design"
            height={20}
            decoding="async"
            loading="lazy"
          />
        </Box>
      </Box>
    </Box>
  );
};
