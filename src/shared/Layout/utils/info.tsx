// src/shared/Layout/utils/info.ts
import WhatsApp from "@mui/icons-material/WhatsApp";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FmdGoodOutlined from '@mui/icons-material/FmdGoodOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { IContactInfo, IMenuOption, IProductsItems, ISubproductsItems } from "@/types/InfoTypes";

export const navBarLines: number = 2;   //  1
export const isNavBarTransparent: boolean = false;
export const navBarDesktopHeight: string = "182px"; // tiene que ser la suma de las 3 de abajo
export const navBarDesktopInfoHeight: string = "32px"; // tiene que ser la suma de las 2 de abajo
export const navBar1DesktopHeight: string = "100px";
export const navBar2DesktopHeight: string = "50px";
export const navBar12DesktopHeight: string = "150px";
export const navBarMobileHeight: string = "60px";
export const heightForModals: string = "132px";
export const heightForModalsMobile: string = "92px";




export const productsItems: IProductsItems[] = [
  { text: 'Comprar', path: '/shop', hasSubproducts: false},
  { text: 'Saber más de cada hongo', path: '/mushroom', hasSubproducts: true },
  { text: 'Contacto', path: '/contact', hasSubproducts: false },
];

export const subproductsItems: ISubproductsItems[] = [
  { text: 'Cordyceps Militaris', path: '/mushroom/cordyceps-militaris' },
  { text: 'Melena de León', path: '/mushroom/melena-de-leon' },
  { text: 'Cola de Pavo', path: '/mushroom/cola-de-pavo' },
  { text: 'Reishi', path: '/mushroom/reishi' },
];

export const menuItems : IMenuOption[] = [
  // { text: 'Inicio', path: '#home' },
  { text: 'Contacto', path: '/contact', icon: <EmailOutlinedIcon /> },
  { text: 'Preguntas Frecuentes', path: '/faq', icon: <HelpOutlineOutlinedIcon /> },
  { text: 'Libro de quejas online', path: '/complaints-book', icon: "" },
  
];


export const contactInfo : IContactInfo[] = [
  { icon: WhatsApp, 
    title: "Dpto Técnico:", 
    text: "341 266-7096", 
    type: "phone",
    url: "https://wa.me/5493412667096?text=🍄%20Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20hongos%20adaptógenos.",
  },
  { icon: MailOutlineOutlinedIcon, 
    title: "", 
    text: "mundoadaptogenos@gmail.com", 
    type: "Email",
    url: "",
  },
  {
    icon: FmdGoodOutlined,
    title: "",
    text: "Sadi Carnot 5952, Rosario, Santa Fe",
    type: "Dirección",
    url: "",
  },
  {
    icon: InstagramIcon,
    title: "",
    text: "@mundoadaptogenos",
    type: "Instagram",
    url: "https://www.instagram.com/mundoadaptogenos/",
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