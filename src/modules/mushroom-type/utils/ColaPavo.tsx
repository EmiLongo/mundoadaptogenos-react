// src/modules/mushroom-type/utils/ColaPavo.tsx
import imgTitle from "@img/mushroom-types/cola-de-pavo-portada.jpg"
import benefits1 from "@img/mushroom-types/benefits-draw/inmune.svg"
import benefits2 from "@img/mushroom-types/benefits-draw/digestive.svg"
import benefits3 from "@img/mushroom-types/benefits-draw/cancer.svg"
import benefits4 from "@img/mushroom-types/benefits-draw/skincare.svg"
import imgDescription from "@img/mushroom-types/cola-de-pavo-caracteristicas-fisicas.jpg"
import imgHarvest from "@img/mushroom-types/cola-de-pavo-cultivo.jpg"
import { IMushroomDetails } from "../components/types"

//Ficha para Reishi
export const infoColaPavo: IMushroomDetails = {
  imgTitle: imgTitle,
  title: "Cola de Pavo",
  subtitle: "(Trametes Versicolor)",
  basicDescription: "Es uno de los hongos medicinales más conocidos del mundo. Estudios recientes in vitro e in vivo han demostrado que posee muchas propiedades, es antitumoral, antimicrobiano, antidiabético, inmunoestimulante y antioxidante.",
  benefits: [
    {
      icon: benefits1,
      description: "Potencia el sistema inmunológico",
    },
    {
      icon: benefits2,
      description: "Favorece la salud intestinal",
    },
    {
      icon: benefits3,
      description: "Ayuda a prevenir el cáncer",
    },
    {
      icon: benefits4,
      description: "Antioxidante y protector de la salud de la piel",
    },
  ],
  productSection: [4],
  bioactive: ["MUSARIN","TRIPTERPENOS","BETA-GLUCANOS","PSK","ESTEROLES","PSP"],
  healthEffects: [
    {
      title: "Agente antitumoral",
      subtitle: "Polisacárido Krestin o PSK",
      description: ["Se utiliza como un estimulador del sistema inmune y ayuda en el tratamiento del cáncer en países de Europa, en China y Japón, donde está aprobado como inmunoterapia y sus gastos están cubiertos por el seguro de salud del gobierno.", "Ensayos conducidos en humanos han demostrado que el PSK puede bajar la recurrencia del cáncer cuando es usado como complemento del tratamiento de quimio y radioterapia.", "Se ha demostrado que puede reducir el crecimiento de ciertas células cancerosas y su toma es segura para dosis diarias durante períodos prolongados ya que no tiene efectos adversos."],
    },
    {
      title: "Antioxidante y protector de la salud de la piel",
      subtitle: "",
      description: ["Aunque no es un cosmético directo, la Cola de Pavo puede beneficiar la piel de manera indirecta por sus efectos sobre el sistema inmunológico y la salud en general.", "Ayuda a combatir el estrés oxidativo, que es una de las causas del envejecimiento prematuro de la piel, y protege las células de la piel del daño causado por radicales libres (exposición solar, contaminación, etc.).", "Puede reducir la inflamación sistémica, lo cual se traduce muchas veces en menos enrojecimiento, irritación o brotes en pieles sensibles o con tendencia al acné."],
    },
    {
      title: "Potenciador de Inmunidad",
      subtitle: "Proteína PSP",
      description: ["Estudios han demostrado que la PSP tiene una variedad de funciones fisiológicas:", 
        "  · Refuerza el sistema inmunológico",
        "  · Es antitumoral",
        "  · Protege el hígado",
        "  · Reduce los lípidos en sangre",
        "  · Tiene propiedades antioxidantes",
        "  · Mejora los efectos secundarios causados por quimio y radioterapia.",
         "Se ha utilizado clínicamente para tratar distintos cánceres, Hepatitis, Hiperlipidemia, Bronquitis crónica. Al tener baja citotoxicidad no tiene reacciones adversas graves."],
    },
  ],
  imgDescription: imgDescription,
  description: ["Es una especie muy llamativa por su variedad de colores que se disponen de forma concéntricas y tiene una estructura de repisa con formas onduladas y textura aterciopeladas.","En función del lugar donde crece adopta diferentes tamaños, formas más o menos rizadas y distintos colores; que van desde el marrón al lila, pasando por los rosados."],
  imgHarvest: imgHarvest,
  harvest: ["Es uno de los más cotizados tanto por su escasez en la naturaleza como por su dificultad de recolección. Crece de forma natural en las mesetas altas del Tíbet y hace años que es recolectado intensamente en zonas de China, Bután y Nepal.","Gracias a la investigación científica, es posible cultivar una cepa determinada de Cordyceps en biorreactor. Este sistema de cultivo permite su producción en un sustrato líquido completamente natural del que se obtiene el micelio de Cordyceps, cuya riqueza en biomoléculas activas es como la del carpóforo silvestre."],
}