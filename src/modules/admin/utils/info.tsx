// src/modules/admin/utils/info.tsx
// import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';

export interface IMenuOption {
  title: string;
  icon: React.ReactNode;
  to: string;
}

export const MenuOptionsTop = [
  {
    title: 'Secciones',
    icon: <WidgetsOutlinedIcon />,
    to: '/admin/sections'
  },
  {
    title: 'Productos',
    icon: <Inventory2OutlinedIcon />,
    to: '/admin/products'
  },
  {
    title: 'Descuentos',
    icon: <PriceChangeOutlinedIcon />,
    to: '/admin/discounts'
  },
  {
    title: 'Historial',
    icon: <ManageHistoryOutlinedIcon />,
    to: '/admin/history'
  },
  // {
  //     title: 'Paquetes',
  //     icon: <CardTravel />,
  //     to: '/admin/paquetes'
  // },
  // {
  //     title: 'Imágenes',
  //     icon: <RiImage2Line />,
  //     to: '/admin/paquetes'
  // },
]

export const MenuOptionsBottom = [
  {
    title: 'Administradores',
    icon: <ManageAccountsOutlinedIcon />,
    to: '/admin/set-admins'
  },
  // {
  //     title: 'Reportes',
  //     icon: <BarChart />,
  //     to: '/admin/reportes'
  // },
  // {
  //     title: 'Tráfico',
  //     icon: <Insights />,
  //     to: '/admin/trafico'
  // }
]