// src/modules/mushroom-type/utils/Melena.tsx
import imgTitle from "@img/mushroom-types/melena-de-leon-portada.jpg"
import benefits1 from "@img/mushroom-types/benefits-draw/brain.svg"
import benefits2 from "@img/mushroom-types/benefits-draw/digestive.svg"
import benefits3 from "@img/mushroom-types/benefits-draw/peace.svg"
import benefits4 from "@img/mushroom-types/benefits-draw/inmune.svg"
import imgDescription from "@img/mushroom-types/melena-de-leon-caracteristicas-fisicas.jpg"
import imgHarvest from "@img/mushroom-types/melena-de-leon-cultivo.webp"
import { IMushroomDetails } from "../components/types"
//Ficha para Melena de León
export const infoMelena: IMushroomDetails = {
  imgTitle: imgTitle,
  title: "Melena de León",
  subtitle: "(Hericium Erinaceus)",
  basicDescription: "Además de consumirse como alimento es un hongo muy valorado por sus propiedades nutricionales y beneficios para la salud. Se destaca por su alto contenido en proteínas, vitaminas del grupo B, minerales (potasio, hierro, fósforo, zinc) y compuestos bioactivos con propiedad medicinales particularmente en el ámbito cognitivo y neurológico. ",
  benefits: [
    {
      icon: benefits1,
      description: "Potencia las funciones cognitivas",
    },
    {
      icon: benefits2,
      description: "Mejora la salud gastrointestinal",
    },
    {
      icon: benefits3,
      description: "Combate la Ansiedad y Depresión",
    },
    {
      icon: benefits4,
      description: "Regula el sistema inmunológico",
    },
  ],
  productSection: [1],
  bioactive: ["HERICENONAS", "ERINACINAS", "BETA-GLUCANOS", "VITAMINAS B", "VITAMINAS D", "MINERALES"],
  healthEffects: [
    {
      title: "Combate la Ansiedad y Depresión",
      subtitle: "",
      description: ["Además de promover la neurogénesis en el hipocampo (región del cerebro responsable de las respuestas emocionales) también posee propiedades antiinflamatorias. Se cree que ambas propiedades pueden ayudar a reducir los síntomas asociados a la ansiedad y la depresión.", "Sin embargo, la investigación acerca de la acción antidepresiva de Hericium Erináceus todavía se encuentra en etapas tempranas y los mecanismos específicos acerca de su modo de acción todavía requieren una mayor profundización."],
    },
    {
      title: "Regula la Microbiota y la Inmunidad",
      subtitle: "",
      description: ["Varios estudios científicos han destacado su importancia en el tratamiento de enfermedades inflamatorias intestinales (como las úlceras y la enfermedad de Crohn) debido a sus polisacáridos y su acción prebiótica capaz de estabilizar la flora intestinal.", "Existe un estrecho vínculo entre el equilibrio de la microbiota intestinal y el sistema inmune, por lo que el consumo de ciertas sustancias bioactivas puede tener un impacto significativo en nuestra inmunidad.", "Por otro lado, los beta-glucanos se consideran sustancias inmunomoduladoras capaces de reforzar el sistema inmune, ayudando así a combatir la acción dañina de ciertos agentes externos."],
    },
    {
      title: "Neuroprotección y Cognición",
      subtitle: "Erinacinas y Hericenonas",
      description: ["Presenta un importante efecto nootrópico, capaz de potenciar las funciones cognitivas del cerebro, la atención y la memoria. Esto es posible dado que contiene Erinacinas y Hericenonas que estimulan la producción del factor de crecimiento nervioso (NGF). Esta es una proteína que interviene de manera directa en la regeneración y reparación de las neuronas del sistema nervioso.", "Los extractos de Hericium Erináceus, al evitar el deterioro neuronal y la apoptosis de las células nerviosas, pueden comportarse como neuroprotector para la prevención de enfermedades neurodegenerativas tales como el Alzheimer o el Parkinson."],
    },
  ],
  imgDescription: imgDescription,
  description: ["Presenta un cuerpo blanco redondeado recubierto de espinas de hasta 6 cm de longitud que salen todas del mismo punto y que caen en forma de cascada.", "Su imagen visual se asemeja a una cascada congelada o a una majestuosa melena de león, de ahí su nombre popular."],
  imgHarvest: imgHarvest,
  harvest: ["Se extiende por muchas regiones del planeta pero su cultivo se reportó por primera vez en China en 1988, siendo hoy su mayor productor mundial.", "Puede realizarse tanto en forma industrial como artesanal. El cultivo comercial emplea troncos de árboles muertos o aserrín esterilizado.", "El hongo crecen en zonas donde no hay incidencia directa del sol, las temperaturas oscilan entre 15 y 20 °c y la humedad ambiental es alta."],
}