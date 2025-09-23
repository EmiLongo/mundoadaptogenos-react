// src/shared/hooks/api/useProduct.ts
import { supabase } from "@/api/apiClient";
import {
  IProductFormValues,
  IProductWithSections,
} from "@/types/ProductTypes";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useProduct = () => {
  const [product, setProduct] = useState<IProductWithSections | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GET product by ID
  const fetchProduct = useCallback(async (productId: number) => {
    try {
      setIsFetching(true);
      setError(null);

      const { data, error } = await supabase
        .from("products_with_sections") // view o join que devuelve sections
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;
      setProduct(data);
      return { success: true, data };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsFetching(false);
    }
  }, []);

  // CREATE product
  const createProduct = useCallback(
    async (productData: IProductFormValues) => {
      try {
        setIsSaving(true);
        setError(null);

        // separar sectionIds porque no pertenece a "products"
        const { sectionIds, ...productFields } = productData;

        const { data, error } = await supabase
          .from("products")
          .insert([{ ...productFields, packaging_id: productFields.packaging_id ?? 1 }])
          .select("*")
          .single();

        if (error) throw error;

        // insertar relaciones con secciones si existen
        if (sectionIds && sectionIds.length > 0) {
          await createProductSections(
            sectionIds.map((sectionId) => ({
              product_id: data.id,
              section_id: sectionId,
            }))
          );
        }

        setProduct(data);
        toast.success("Producto creado con exito");
        return { success: true, data };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        toast.error(message);
        return { success: false, error: message };
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  // CREATE product_sections
  const createProductSections = useCallback(
    async (productSections: { product_id: number; section_id: number }[]) => {
      try {
        const { error } = await supabase
          .from("product_sections")
          .insert(productSections);

        if (error) throw error;
        return { success: true };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        return { success: false, error: message };
      }
    },
    []
  );

  // UPDATE validity
  const updateProductValidity = useCallback(
    async (productId: number, isValid: boolean) => {
      try {
        setIsSaving(true);
        setError(null);

        const { error } = await supabase
          .from("products")
          .update({ is_valid: isValid })
          .eq("id", productId);

        if (error) throw error;

        setProduct((prev) =>
          prev ? { ...prev, is_valid: isValid } : prev
        );
        return { success: true };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        toast.error(message);
        return { success: false, error: message };
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  // UPDATE product + sections
  const updateProduct = useCallback(
    async (
      productId: number,
      updates: Partial<IProductFormValues>,
      originalSectionIds: number[]
    ) => {
      try {
        setIsSaving(true);
        setError(null);

        const { sectionIds, ...productFields } = updates;

        // actualizar producto
        const { data, error } = await supabase
          .from("products")
          .update([{ ...productFields, packaging_id: productFields.packaging_id ?? 1 }])
          .eq("id", productId)
          .select("*")
          .single();

        if (error) throw error;

      // comparar secciones
      if (sectionIds && originalSectionIds) {
        const toAdd = sectionIds.filter((id) => !originalSectionIds.includes(id));
        const toRemove = originalSectionIds.filter((id) => !sectionIds.includes(id));

        // borrar relaciones que sobran
        if (toRemove.length > 0) {
          await supabase
            .from("product_sections")
            .delete()
            .eq("product_id", productId)
            .in("section_id", toRemove);
        }

        // insertar nuevas relaciones
        if (toAdd.length > 0) {
          await supabase.from("product_sections").insert(
            toAdd.map((id) => ({ product_id: productId, section_id: id }))
          );
        }
      }

        setProduct((prev) => (prev ? { ...prev, ...data } : data));
        toast.success("Producto actualizado con exito");
        return { success: true, data };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        toast.error(message);
        return { success: false, error: message };
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  return {
    product,
    isFetching,
    isSaving,
    error,
    fetchProduct,
    createProduct,
    createProductSections,
    updateProductValidity,
    updateProduct,
  };
};
