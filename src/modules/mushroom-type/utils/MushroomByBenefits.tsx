import { IBenefit } from "@/types/MushroomTypes";
import { infoColaPavo } from "./ColaPavo";
import { infoCordyceps } from "./Cordyceps";
import { infoMelena } from "./Melena";
import { infoReishi } from "./Reishi";

interface IMushroomByBenefits {
  title: string;
  productSectionSlug: string;
  benefits: IBenefit[];
}

export const MushroomByBenefits: IMushroomByBenefits[] = [
  {
    title: infoColaPavo.title,
    productSectionSlug: infoColaPavo.productSectionSlug,
    benefits: infoColaPavo.benefits,
  },
  {
    title: infoCordyceps.title,
    productSectionSlug: infoCordyceps.productSectionSlug,
    benefits: infoCordyceps.benefits,
  },
  {
    title: infoMelena.title,
    productSectionSlug: infoMelena.productSectionSlug,
    benefits: infoMelena.benefits,
  },
  {
    title: infoReishi.title,
    productSectionSlug: infoReishi.productSectionSlug,
    benefits: infoReishi.benefits,
  },
]