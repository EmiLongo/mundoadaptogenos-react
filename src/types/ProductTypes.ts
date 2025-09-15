// src/types/ProductTypes.ts

// esto es viejo para la data del catalogue
export interface IProduct {
  id: number;
  sectionId: number[];
  packagingId: number;
  title: string;
  description?: string;
  discount: number;
  price: number;
  priceDiscount: number;
  priceTransfer: number;
  plan: string;
  urlPhoto: string;
  urlThumbnail: string;
  hasOptions: boolean
  isValid: boolean;
  createdAt?: string;
}

export interface ISection {
  id: number;
  title: string;
  slug: string;
  date_active_start: string | null;
  date_active_end: string | null;
  is_active: boolean;
  section_discount: number;
  priority: number;
  created_at: string;
  updated_at: string;
  has_options: boolean;
}

export interface IProductWithSections {
  id: number;
  internal_code: string;
  packaging_id: number;
  title: string;
  description: string | null;
  price: number;
  price_discount: number;
  price_transfer: number;
  plan: string;
  img_secure_url: string;
  img_public_id: string;
  gallery_public_ids: string[] | null;
  discount: number;
  is_valid: boolean;
  created_at: string;
  price_without_tax: number;

  // Packaging info
  packaging_name: string | null;
  packaging_description: string | null;
  packaging_weight: number | null;
  packaging_capacity: number | null;

  // Array de secciones
  sections: ISection[];
}

export interface IPackage {
  id: number;
  name: string;
  description: string;
  weight: number;
  capacity: number;
}