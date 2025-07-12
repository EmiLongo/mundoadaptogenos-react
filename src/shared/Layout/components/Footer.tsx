import React from "react";
import {
  Box,
  List,
  Container,
} from "@mui/material";

// import inpulseLogo from "@img/inpulse_design_logo_blanco.svg";
import logoContraste from "@img/logo_nombre_vertical.svg";
import { menuItems, productsItems } from "../utils/info";
import {
  BodyS,
  CaptionAlt,
  Heading5,
} from "@/theme/textStyles";
import { toast } from "react-toastify";
import { greyColor } from "@/theme/theme";
import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton";
import { useNavigate } from "react-router-dom";
import { NewsletterForm } from "./NewsletterForm";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export const Footer: React.FC = () => {

  const navigate = useNavigate();

  // Función para compartir URL
  const shareURL = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Óptica Villagra",
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
        backgroundColor: "background.paper",
        color: greyColor[950], 
        borderTop: `1px ${greyColor[400]} solid`,
        paddingTop: "24px"
      }}
    >
      <Container sx={{maxWidth: {xs: "unset", sm:"550px", lg:"950px"}}}>
        <Box
          id="footerContainer"
          sx={{
            width: "100%",
            display: "grid",
            // justifyContent: "space-between",
            gridTemplateColumns: {xs: "repeat(2, auto)", sm: "repeat(2, auto)", lg: "1fr repeat(2, 2fr) 4fr;"},
            gridTemplateRows: {xs:"repeat(5, auto)", sm: "repeat(3, auto)", lg: "repeat(2, auto)"},
            // gap: "auto", 
            columnGap: "2.5rem",
            // gridColumnGap: "0px",
            rowGap: {xs: "20px", sm:"20px", lg:"0px"},
          }}
        >
          {/* Logo */}
          <Box
            component={"img"}
            src={logoContraste}
            alt="Óptica Villagra Blanco y Negro"
            decoding="async"
            loading="lazy"
            onClick={shareURL}
            sx={{
              width: "70px",
              gridArea: {xs:"2 / 1 / 3 / 2", sm:"1 / 1 / 2 / 2", lg:"1 / 1 / 3 / 2"},
            }}
          />

          {/* Categorías */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              gridArea: {xs: "4 / 1 / 5 / 3", sm: "2 / 1 / 3 / 2", lg:"1 / 2 / 2 / 3"},
            }}
          >
            <Heading5 
            sx={{
              width: {xs: "100%", md: "unset"},
              textAlign: {xs: "center", md: "left"}
            }}>
              Categorías</Heading5>
            <List sx={{display: "flex", flexDirection: {xs: "row", sm:"column"}, flexWrap: {xs: "wrap", md: "nowrap"}, gap:"8px"}}>
              {productsItems.map((item) => (
                <Box key={item.text.replace(" ","-")} component={"a"} href={item.path}>
                  <BodyS sx={{ width: {xs: "45vw", md: "unset"}, color: greyColor[800], "&:hover":{color: "text.primary"}}}>
                    {item.text}
                  </BodyS>
                </Box>
              ))}
            </List>
          </Box>

          {/* Secciones de páginas */}
          <Box sx={{
            gridArea: {xs: "5 / 1 / 6 / 3", sm:"3 / 1 / 4 / 2" , lg: "2 / 2 / 3 / 3"},
            display: {xs: "flex", sm:"block"},
            justifyContent: "space-between"
          }}>
            <List sx={{display: "flex", flexDirection: {xs: "row", sm:"column"}, flexWrap: {xs: "wrap", md: "nowrap"}, gap:"8px"}}>
              {menuItems.map((item) => (
                <Box key={item.text.replace(" ","-")} component={"a"} href={item.path}>
                  <BodyS sx={{ width: {xs: "45vw", md: "unset"}, color: greyColor[800], "&:hover":{color: "text.primary"}}}>
                    {item.text}
                  </BodyS>
                </Box>
              ))}
            </List>
          </Box>

          {/* Contacto */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: {xs: "start", sm: "center", lg: "start"},
              gap: "8px",
              gridArea: {xs: "2 / 2 / 4 / 3", sm: "2 / 2 / 3 / 3" , lg: "1 / 3 / 2 / 4"},
            }}
          >
            <Heading5 sx={{width: {xs: "unset",sm: "210px", lg:"unset"},}}>Contáctanos</Heading5>
            <List sx={{width: {xs: "unset",sm: "210px", lg:"unset"},}}>
              <BodyS sx={{ color: greyColor[800]}}>
                Mitre 1745, S. C. de Bariloche.
              </BodyS>
              <BodyS sx={{ color: greyColor[800]}}>
                Rio Negro, Argentina.
              </BodyS>
              <BodyS sx={{ color: greyColor[800]}}>
                CP 8400
              </BodyS>
              <BodyS sx={{ color: greyColor[800]}}>
                +54 9 11 6298 4904
              </BodyS>
              <BodyS sx={{ color: greyColor[800]}}>
                info@kostentrek.com
              </BodyS>
            </List>
          </Box>

          {/* Redes Sociales */}
          <Box sx={{
            display:"flex", 
            justifyContent: {xs: "start", sm: "center", lg: "start"},
          }}>
            <Box sx={{
              display:"flex", 
              width: {xs: "unset",sm: "210px", lg:"unset"},
              gap: "8px", 
              gridArea: {xs: "3 / 1 / 4 / 2", sm: "3 / 2 / 4 / 3" , lg: "2 / 3 / 3 / 4"},
            }}>
            <WhatsAppIcon width={20} sx={{color: "primary.main"}} />
            <InstagramIcon width={20} sx={{color: "primary.main"}} />
            <FacebookIcon width={20} sx={{color: "primary.main"}} />
            </Box>
          </Box>

          {/* Newsletter */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              gridArea: {xs: "1 / 1 / 2 / 3", sm: "1 / 2 / 2 / 3" , lg: "1 / 4 / 3 / 5"},
            }}
          >
            <Heading5 sx={{textWrap: "nowrap"}}>Recibí novedades y enterate de las ofertas!</Heading5>
            <NewsletterForm />
          </Box>

          
          {/* <Divider
          component="hr"
          variant="fullWidth"
          aria-hidden="true"
          sx={{ 
            marginTop: "2rem", 
            marginBottom: "1rem", 
            backgroundColor: palette.primary[100] 
          }} 
          /> */}
        </Box>
        

          <Box
            id="footerBottom"
          >

            {/* Términos y Condiciones */}
            <Box sx={{
              display: "flex",
              flexDirection: {xs: "column", md: "row"},
              justifyContent: "center",
              alignItems: {xs: "center", md: "start"},
              gap: {xs:"8px", sm:"16px", lg:"24px"}
            }}>
              <OnlyTextButton
                id="bt-footer-terms-conditions"
                onClick={()=>navigate("./terms-and-conditions")}
                type="blueButton"
                text="Términos y condiciones"
                isFetching={false}
                disabled={false}
                sx={{
                  textWrap: "nowrap"
                }}
              />
              <OnlyTextButton
                id="bt-footer-privacy-policy"
                onClick={()=>navigate("./privacy-policy")}
                type="blueButton"
                text="Políticas de privacidad"
                isFetching={false}
                disabled={false}
                sx={{
                  textWrap: "nowrap"
                }}
              />
            </Box>
        {/* service Mark y Trade Mark ℠™ */}
            <CaptionAlt sx={{ color: "inherit", textAlign: "center", marginY: "1rem" }}>
              {new Date().getFullYear()} | TM
            </CaptionAlt>
            {/* <Box
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
              <BodyM sx={{ color: "inherit",textAlign: "center" }}>
                Desarrollado por
              </BodyM>
              <Box
                component={"img"}
                src={inpulseLogo}
                alt="Logo Inpulse Design"
                width={100}
                decoding="async"
                loading="lazy"
              />
            </Box> */}
                      </Box>
      </Container>
    </Box>
  );
};
