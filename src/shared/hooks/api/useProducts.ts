// src/shared/hooks/api/useProducts.ts
import { supabase } from "@/api/apiClient";
import { IProductWithSections } from "@/types/ProductTypes";
import { useCallback, useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<IProductWithSections[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("products_with_sections")
          .select("*");

        if (error) throw error;
        setProducts(data ?? []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // 🔹 actualizar is_valid
  const updateProductValidity = useCallback(
    async (productId: number, isValid: boolean) => {
      try {
        setIsLoading(true);
        const { error } = await supabase
          .from("products")
          .update({ is_valid: isValid })
          .eq("id", productId);

        if (error) throw error;

        // ✅ actualizar el estado local sin volver a pedir todo
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, is_valid: isValid } : p
          )
        );
        return true;
      } catch (err) {
        console.error("Error al actualizar producto:", err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // actualizar cualquier campo del producto
  const updateProduct = useCallback(
    async (productId: number, updates: Partial<IProductWithSections>) => {
      try {
        const { error } = await supabase
          .from("products")
          .update(updates)
          .eq("id", productId)
          .select()
          .single();

        if (error) throw error;

        // ✅ actualizar en estado local
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, ...updates } : p
          )
        );

        return true;
      } catch (err) {
        console.error("Error al actualizar producto:", err);
        return false;
      }
    },
    []
  );

  return { products, isLoading, error, updateProductValidity, updateProduct };
};