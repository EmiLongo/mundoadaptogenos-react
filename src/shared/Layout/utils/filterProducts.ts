//  src/shared/Layout/utils/filterProducts.ts
import { IProduct } from "@/shared/types/ProductTypes";


// Filtra los productos del catálogo por sectionId
// @returns Array de productos que pertenecen a la sección especificada
export const filterBySectionId = (catalogue: IProduct[], sectionId: number): IProduct[] => {
  return catalogue.filter(product => 
    product.sectionId.includes(sectionId) && product.isValid
  );
};


// Filtra los productos del catálogo por múltiples sectionIds
// @returns Array de productos que pertenecen a cualquiera de las secciones especificadas
export const filterByMultipleSectionIds = (catalogue: IProduct[], sectionIds: number[]): IProduct[] => {
  return catalogue.filter(product => 
    product.sectionId.some(id => sectionIds.includes(id)) && product.isValid
  );
};

export const filterByPackagingIdByNotSectionId = (catalog: IProduct[], packagingId: number, sectionId: number) => {
  return catalog.filter(
    (item) =>
      item.packagingId === packagingId &&
      !item.sectionId.includes(sectionId) // que NO contenga
  );
};