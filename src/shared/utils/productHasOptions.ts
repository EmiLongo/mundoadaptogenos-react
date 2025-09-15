// src/shared/utils/productHasOptions.ts
import { ISection } from "@/types/ProductTypes";

export const hasSectionWithOptions = (sections: ISection[]): boolean => {
  return sections.some(section => section.has_options === true);
};