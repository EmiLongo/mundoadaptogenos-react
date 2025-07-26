// src/modules/mushroom-type/utils/Reishi.tsx
import imgTitle from "@img/mushroom-types/reishi-portada.jpg"
import benefits1 from "@img/mushroom-types/benefits-draw/ageing.svg"
import benefits2 from "@img/mushroom-types/benefits-draw/inmune.svg"
import benefits3 from "@img/mushroom-types/benefits-draw/heart.svg"
import benefits4 from "@img/mushroom-types/benefits-draw/peace.svg"
import imgDescription from "@img/mushroom-types/reishi-caracteristicas-fisicas.webp"
import imgHarvest from "@img/mushroom-types/reishi-cultivo.jpg"
import { IMushroomDetails } from "../components/types"

//Ficha para Reishi
export const infoReishi: IMushroomDetails = {
  imgTitle: imgTitle,
  title: "Reishi",
  subtitle: "(Ganoderma Lucidum)",
  basicDescription: 'El Reishi se ha ganado el sobrenombre de "hongo de la inmortalidad" o "hierba de la potencia espiritual" por su capacidad de alargar la vida, sido empleado como medicamento en la tradición china por más de 2.000 años.',
  benefits: [
    {
      icon: benefits1,
      description: "Favorece la longevidad celular",
    },
    {
      icon: benefits2,
      description: "Regula el sistema inmunológico",
    },
    {
      icon: benefits3,
      description: "Mejora el sistema circulatorio",
    },
    {
      icon: benefits4,
      description: "Combate la Ansiedad y Depresión",
    },
  ],
  productSection: [3],
  bioactive: ["TERPENOS","17 AMINOÁCIDOS","BETA-GLUCANOS","ERGOSTEROL","MINERALES Y VITAMINAS","GLPS"],
  healthEffects: [
    {
      title: "Potente antioxidante para la longevidad celular",
      subtitle: "Beta-glucanos",
      description: ["Podemos hablar de sus propiedades antioxidantes ya que se ha demostrado que los beta-glucanos poseen la capacidad de neutralizar los radicales libres (ROS) que se generan en el organismo, prolongando la vida útil de las células y promoviendo así su longevidad."],
    },
    {
      title: "Inmunomoludador y prebiótico",
      subtitle: "Beta-glucanos, Triterpenos y Ácidos Ganodéricos",
      description: ["Los beta-glucanos y los ácidos ganodéricos presentes en el hongo poseen un efecto inmunomodulador.", "Los beta-glucanos presentes en el hongo mejoran la capacidad de respuesta del sistema inmunitario, favoreciendo la actuación de los linfocitos, mientras que al mismo tiempo estimulan la función de los macrófagos y de los natural killers, encargados de la detección y destrucción de organismos dañinos.", "También posee Triterpenos y Ácidos Ganodéricos, encargados de inhibir las enzimas asociadas a la proliferación de virus, hongos y bacterias. De esta forma tiene un poder antiinflamatorio y estimulante de la microbiota intestinal, muy ligada al sistema inmune."],
    },
    {
      title: "Bien estar psicológico y cognitivo",
      subtitle: "Triterpenos",
      description: ["Sus Triterpenos son capaces de modular la sinapsis celular y la respuesta frente a diferentes estímulos. Además, estas moléculas intervienen en la producción de hormonas como la epinefrina y la serotonina, involucradas directamente en el control de las emociones y en el estado de ánimo de los individuos. De esta manera se considera que mejora el insomnio y favorece el bienestar psicológico de las personas.", "A diferencia de la mayoría de fármacos con propiedades similares, este hongo no afecta únicamente a un receptor específico, sino que afecta a varios genes y sistemas complejos del organismo, lo que conlleva una menor dependencia y menores efectos secundarios.", "Por otra parte, este hongo presenta un importante efecto nootrópico, regulando las funciones cognitivas del ser humano tales como la memoria, la inteligencia, la creatividad y la concentración."],
    },
    {
      title: "Potencial antitumoral",
      subtitle: "",
      description: ["Existen multitud de estudios que han demostrado que los polisacáridos presentes en el Reishi poseen una potencial actividad anticancerosa debido principalmente a sus propiedades inmunomoduladoras, proapoptóticas, antimetastásicas y antiangiogénicas.", "Esto sugiere que no sólo actúan estimulando la respuesta inmune, sino también mostrando efectos citotóxicos y citostáticos en las células tumorales.", "Habitualmente se utiliza como terapia coadyuvante de la quimio y radioterapia."],
    },
    {
      title: "Protección cardiovascular",
      subtitle: "",
      description: ["Aunque no está totalmente contrastada la eficacia del Reishi para reducir los niveles altos de glucosa o de colesterol en sangre; sí hay estudios que ponen de manifiesto su importancia para ayudar a reducir la presión arterial, evitar la agregación plaquetaria, prevenir la trombosis y facilitar la circulación sanguínea."],
    },
  ],
  imgDescription: imgDescription,
  description: ["Su forma y color recuerda a los corales marinos. Crece formando anillos que se hacen más gruesos hacia el interior.","La gama de colores que abarca el Reishi va desde el rojo intenso hasta el blanco pasando por el amarillo. Tiene una consistencia leñosa que gana dureza a medida que pasa el tiempo.","Su forma y color pueden variar enormemente, haciendo que sean fácilmente confundidos con otros hongos."],
  imgHarvest: imgHarvest,
  harvest: ["Crece de forma silvestre en bosques caducifolios, especialmente de robles y hayas, pero también se encuentra en bosques de coníferas.","Actualmente, se encuentra de forma natural en el sudeste asiático, Europa y América del Norte. Sin embargo, la mayor parte se produce mediante el cultivo ya que la demanda de esta especie es creciente en todo el mundo.","La producción de Reishi también se puede llevar a cabo a partir de troncos o en sacos de aserrín."],
}