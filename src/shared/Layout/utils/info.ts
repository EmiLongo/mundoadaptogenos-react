// src/shared/Layout/utils/info.ts
import WhatsApp from "@mui/icons-material/WhatsApp";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FmdGoodOutlined from '@mui/icons-material/FmdGoodOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

export const navBarLines: number = 2;   //  1
export const isNavBarTransparent: boolean = false;
export const navBarDesktopHeight: string = "150px"; // tiene que ser la suma de las 2 de abajo
export const navBar1DesktopHeight: string = "100px";
export const navBar2DesktopHeight: string = "50px";
export const navBarMobileHeight: string = "60px";



export const productsItems = [
  { text: 'Anteojos de Sol', path: '/anteojos-de-sol' },
  { text: 'Armazones de Receta', path: '/armazones-receta' },
  { text: 'Clip-On', path: '/clip-on' },
  { text: 'Indestructibles', path: '/indestructibles' },
];

export const menuItems = [
  // { text: 'Inicio', path: '#home' },
  { text: 'Nosotros', path: '/about-us' },
  { text: 'Libro de quejas', path: '/complaints-book' },
  
];

export interface IContactInfo {
  icon: React.ElementType;
  title: string;
  text: string;
  type: string;
  url: string;
}

export const contactInfo : IContactInfo[] = [
  { icon: WhatsApp, 
    title: "Dpto Técnico:", 
    text: "341 338-9977", 
    type: "phone",
    url: "https://wa.me/5493413389977?text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Talleres%20Montreal."
  },
  { icon: WhatsApp, 
    title: "Administración:", 
    text: "3476 619-576", 
    type: "phone",
    url: "https://wa.me/5493476619576?text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Talleres%20Montreal.",
  },
  { icon: LocalPhoneOutlined, 
    title: "Teléfono Fijo:", 
    text: "3476 224-447", 
    type: "phone",
    url: "",
  },
  { icon: MailOutlineOutlinedIcon, 
    title: "", 
    text: "talleresmontrealsrl@gmail.com", 
    type: "Email",
    url: "",
  },
  {
    icon: FmdGoodOutlined,
    title: "",
    text: " Av José Márquez 856, San Lorenzo, Santa Fe",
    type: "Dirección",
    url: "",
  },
  {
    icon: InstagramIcon,
    title: "",
    text: "@inpulse_design",
    type: "Instagram",
    url: "https://www.instagram.com/inpulse_design/",
  },
  {
    icon: LinkedInIcon,
    title: "",
    text: "Linkedin",
    type: "Linkedin",
    url: "https://www.linkedin.com/in/inpulsedesign/",
  },
];

// Agregar iconos a los items de contacto
// <item.icon sx={{ fontSize: "1.5rem", color: "secondary.main" }} />