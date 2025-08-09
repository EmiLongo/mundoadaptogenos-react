// src\shared\Layout\utils\catalogue.ts
import { IProduct } from "@/types/ProductTypes";
import colaPavoImg from "@img/card/cola-pavo.png" 
import melenaImg from "@img/card/melena-leon.png" 
import reishiImg from "@img/card/reishi.png" 
import cordycepsImg from "@img/card/cordyceps-militaris.png"
import colaPavoThumb from "@img/card/thumbnail-cola-pavo.png" 
import melenaThumb from "@img/card/thumbnail-melena-leon.png" 
import reishiThumb from "@img/card/thumbnail-reishi.png" 
import cordycepsThumb from "@img/card/thumbnail-cordyceps-militaris.png" 
import kitThumb from "@img/card/thumbnail-kit-equilibrio.png"
import kit from "@img/card/kit-equilibrio.png"


export const catalogue: IProduct[] = [{
  id: 1011,
  sectionId: [1],
  packagingId: 1,
  title: 'Melena de León - Extracto Doble de 30ml con gotero',
  description: "Doble Extracto Concentrado. Ayuda a tu cerebro y mejora tu salud gastrointestinal.",
  discount: 15,
  price: 37700,
  priceDiscount: 32000,
  priceTransfer: 25600,
  plan: "6 x $5.333 sin interés",
  urlPhoto: melenaImg,
  urlThumbnail: melenaThumb,
  hasOptions: false,
  isValid: true,
},
{
  id: 1012,
  sectionId: [2],
  packagingId: 1,
  title: 'Cordyceps Militaris - Extracto Doble de 30ml con gotero',
  description: "Doble Extracto Concentrado. Vigorizante, reduce la fatiga y estimula el sistema inmunológico.",
  discount: 15,
  price: 37700,
  priceDiscount: 32000,
  priceTransfer: 25600,
  plan: "6 x $5.333 sin interés",
  urlPhoto: cordycepsImg,
  urlThumbnail: cordycepsThumb,
  hasOptions: false,
  isValid: true,
},
{
  id: 1013,
  sectionId: [3],
  packagingId: 1,
  title: 'Reishi - Extracto Doble de 30ml con gotero',
  description: "Doble Extracto Concentrado. Lucha contra el cáncer, mejora respuesta inmune y efecto antioxidante.",
  discount: 15,
  price: 37700,
  priceDiscount: 32000,
  priceTransfer: 25600,
  plan: "6 x $5.333 sin interés",
  urlPhoto: reishiImg,
  urlThumbnail: reishiThumb,
  hasOptions: false,
  isValid: true,
},
{
  id: 1014,
  sectionId: [4],
  packagingId: 1,
  title: 'Cola de Pavo - Extracto Doble de 30ml con gotero',
  description: "Doble Extracto Concentrado. Potencia las defensas del sistema inmunológico y favorece la salud intestinal.",
  discount: 15,
  price: 37700,
  priceDiscount: 32000,
  priceTransfer: 25600,
  plan: "6 x $5.333 sin interés",
  urlPhoto: colaPavoImg,
  urlThumbnail: colaPavoThumb,
  hasOptions: false,
  isValid: true,
},
{
  id: 1015,
  sectionId: [1, 2, 3, 4, 5],
  packagingId: 1,
  title: 'Kit Equilibrio - 3x Extracto Doble de 30ml a elección',
  description: "Doble Extracto Concentrado. Podés elegir cualquiera de nuestras opciones",
  discount: 15,
  price: 80000,
  priceDiscount: 68000,
  priceTransfer: 54400,
  plan: "6 x $11.333 sin interés",
  urlPhoto: kitThumb,
  urlThumbnail: kit,
  hasOptions: true,
  isValid: true,
},
]