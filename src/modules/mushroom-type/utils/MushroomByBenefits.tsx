import { IBenefit } from "@/types/MushroomTypes";
import { infoColaPavo } from "./ColaPavo";
import { infoCordyceps } from "./Cordyceps";
import { infoMelena } from "./Melena";
import { infoReishi } from "./Reishi";

interface IMushroomByBenefits {
  title: string;
  productSection: number[];
  benefits: IBenefit[];
}

export const MushroomByBenefits: IMushroomByBenefits[] = [
  {
    title: infoColaPavo.title,
    productSection: infoColaPavo.productSection,
    benefits: infoColaPavo.benefits,
  },
  {
    title: infoCordyceps.title,
    productSection: infoCordyceps.productSection,
    benefits: infoCordyceps.benefits,
  },
  {
    title: infoMelena.title,
    productSection: infoMelena.productSection,
    benefits: infoMelena.benefits,
  },
  {
    title: infoReishi.title,
    productSection: infoReishi.productSection,
    benefits: infoReishi.benefits,
  },
]