// src/types/DiscountsTypes.ts

export interface IDiscount {
  taxDiscount: number | null;
  activeTaxDiscount: boolean;
  bankTransfer: number | null;
  activeBankTransfer: boolean;
  eventualDiscount1: number | null;
  activeEventual1: boolean;
  eventualDiscount2: number | null;
  activeEventual2: boolean;
  eventualDiscount3: number | null;
  activeEventual3: boolean;
}