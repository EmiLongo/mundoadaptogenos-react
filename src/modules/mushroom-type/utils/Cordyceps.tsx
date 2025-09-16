// src/modules/mushroom-type/utils/Cordyceps.tsx
import imgTitle from "@img/mushroom-types/cordyceps-militaris-portada.jpg"
import benefits1 from "@img/mushroom-types/benefits-draw/inmune.svg"
import benefits2 from "@img/mushroom-types/benefits-draw/emotional.svg"
import benefits3 from "@img/mushroom-types/benefits-draw/strenght.svg"
import benefits4 from "@img/mushroom-types/benefits-draw/kidneys.svg"
import imgDescription from "@img/mushroom-types/cordyceps-militaris-caracteristicas-fisicas.webp"
import imgHarvest from "@img/mushroom-types/cordyceps-militaris-cultivo.jpg"
import { IMushroomDetails } from "@/types/MushroomTypes"

//Ficha para Reishi
export const infoCordyceps: IMushroomDetails = {
  imgTitle: imgTitle,
  title: "Cordyceps Militaris",
  subtitle: "(familia de Cordyceps Spp)",
  basicDescription: "Es uno de los remedios naturales más reconocidos de la medicina tradicional china por sus propiedades antioxidantes, energizantes y afrodisiacas, aparte de presentar un importante efecto inmunomodulador y protector renal y hepático. Además de estas, también se le atribuyen ciertas propiedades antitumorales y antidiabéticas.",
  benefits: [
    {
      icon: benefits1,
      description: "Estimula el sistema inmunológico",
    },
    {
      icon: benefits2,
      description: "Vigoriza y aumenta la libido",
    },
    {
      icon: benefits3,
      description: "Energizante y potenciador muscular",
    },
    {
      icon: benefits4,
      description: "Protector renal y hepático",
    },
  ],
  productSectionSlug: "cordyceps-militaris",
  bioactive: ["Ác A-LINOLÉNICO y LINOLÉNICO","ERGOSTEROL","BETA-GLUCANOS","ADENOSINA","CORDICEPINA","ÁCIDO CORDICÉPTICO"],
  healthEffects: [
    {
      title: "Energizante natural y potenciador muscular",
      subtitle: "Cordicepina",
      description: ["Genera un importante efecto energizante, capaz de combatir la fatiga crónica y el agotamiento, mejorando así la resistencia y la vitalidad. Esto se debe principalmente a que estimula la producción de ATP y favorece el uso de oxígeno, lo que aumenta la potencia muscular y reduce considerablemente su tiempo de recuperación.", "También posee un significativo efecto antioxidante por favorecer en la eliminación de los radicales libres del organismo y ayudar así a aliviar la fatiga muscular."],
    },
    {
      title: "Mejora la salud reproductiva y aumenta la libido",
      subtitle: "",
      description: ["Se lo conoce como el viagra tibetano o viagra del Himalaya debido a que mejora la salud reproductiva y la libido. Ha sido empleado de manera habitual en la medicina tradicional por esos efectos y es capaz de reparar la función reproductiva cuando esta se encuentra deteriorada."],
    },
    {
      title: "Protector renal y hepático",
      subtitle: "Manitol o Ácido Cordicéptico",
      description: ["Es un protector renal y hepático por sus propiedades antiapoptóticas (anti muerte celular), antiinflamatorias e inhibidoras de la proliferación de células mesangiales.", "Es utilizado para el tratamiento de enfermedades como Nefritis e Insuficiencia renal crónica al promover la función renal y disminuir la urea y la creatinina sérica en sangre.", "También es utilizado en enfermedades hepáticas como la Hepatitis crónica por mejorar la respuesta inmune y ayudar a inhibir la fibrosis del hígado."],
    },
    {
      title: "Inmunomodulador y Antidiabético",
      subtitle: "",
      description: ["Al estimular la producción de Macrófagos y Células NK mejora el proceso de fagocitosis necesario para combatir infecciones.", "Así mismo, debido a su efecto inhibitorio también se puede emplear para ayudar en el tratamiento de enfermedades autoinmunes como Lupus o como un agente inmunosupresor, para evitar un rechazo después de un trasplante de órganos.", "Existen multitud de estudios que abalan el uso de Cordyceps Militaris como un agente antitumoral de gran eficacia y como un potencial agente antidiabético para el tratamiento de la Diabetes Mellitus."],
    },
  ],
  imgDescription: imgDescription,
  description: ["Puede llegar a medir de 2 a 5 cm de altura y tienen forma de maza. Es de color naranja / rojo y que crecen a partir de pupas subterráneas muertas. El tejido fúngico interno es de color blanquecino a naranja pálido."],
  imgHarvest: imgHarvest,
  harvest: ["Es uno de los más cotizados tanto por su escasez en la naturaleza como por su dificultad de recolección. Crece de forma natural en las mesetas altas del Tíbet y hace años que es recolectado intensamente en zonas de China, Bután y Nepal.", "Gracias a la investigación científica, es posible cultivar una cepa determinada de Cordyceps en biorreactor. Este sistema de cultivo permite su producción en un sustrato líquido completamente natural del que se obtiene el micelio de Cordyceps, cuya riqueza en biomoléculas activas es como la del carpóforo silvestre."],
}