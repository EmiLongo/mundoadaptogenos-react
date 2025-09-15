// src/shared/hooks/api/useProducts.ts
import { supabase } from "@/api/apiClient";
import { IProductWithSections } from "@/types/ProductTypes";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<Partial<IProductWithSections[]>>([]);
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

  return { products, isLoading, error };
};