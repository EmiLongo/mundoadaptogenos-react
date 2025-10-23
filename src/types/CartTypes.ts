// src/types/CartTypes.ts
import { IProductWithSections } from "@/types/ProductTypes";

export interface ICartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedAt: string;
  product: IProductWithSections;
  options?: string[]
}

export interface ICart {
  id: number;
  userId?: number;
  sessionId?: string;
  email?: string;
  status: 'active' | 'abandoned' | 'converted' | 'expired';
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  lastAddedProduct: (IProductWithSections & { quantity: number }) | null;
  lastAddedAt: string | null;
  abandonedAt?: string;
  emailSent: boolean;
  emailSentAt?: string;
  cartItems: ICartItem[];
}
