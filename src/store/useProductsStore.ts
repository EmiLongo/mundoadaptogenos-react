// src/store/useProductsStore.ts
// usado para el lado del cliente
import { supabase } from "@/api/apiClient";
import { IProductWithSections } from "@/types/ProductTypes";
import { create } from "zustand";


interface ProductsState {
  products: IProductWithSections[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: number) => IProductWithSections | undefined;
  getProductByCode: (code: string) => IProductWithSections | undefined;
  filterBySection: (sectionId: number) => IProductWithSections[];
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  // Traer todos los productos desde Supabase
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("products_with_sections")
        .select("*");

      if (error) throw error;

      set({ products: data ?? [] });
    } catch (err: unknown) {
      if (err instanceof Error) set({ error: err.message });
      else set({ error: "Unknown error" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Obtener un producto por id
  getProductById: (id: number) => {
    return get().products.find((p) => p.id === id);
  },

  // Obtener un producto por code
  getProductByCode: (code: string) => {
    return get().products.find((p) => p.internal_code === code);
  },

  // Filtrar productos por sección
  filterBySection: (sectionId: number) => {
    return get().products.filter((p) =>
      p.sections.some((s) => s.id === sectionId)
    );
  },
}));
