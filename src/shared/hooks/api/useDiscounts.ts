import { supabase } from "@/api/apiClient";
import { IDiscount } from "@/types/DiscountsTypes";
import { useEffect, useState } from "react";

export const useDiscounts = () => {
  const [discounts, setDiscounts] = useState<Partial<IDiscount>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setIsLoading(true);
        const { data: discounts, error } = await supabase
          .from('discount_settings')
          .select('*')
          .limit(1);

        if (error) throw error;
        setDiscounts({
          taxDiscount: discounts[0].active_tax_discount ? discounts[0].tax_discount : null,
          bankTransfer: discounts[0].active_bank_transfer ? discounts[0].bank_transfer : null, 
          eventualDiscount1: discounts[0].active_eventual_1 ? discounts[0].eventual_discount_1 : null,
          eventualDiscount2: discounts[0].active_eventual_2 ? discounts[0].eventual_discount_2 : null,
          eventualDiscount3: discounts[0].active_eventual_3 ? discounts[0].eventual_discount_3 : null,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  return { discounts, isLoading, error };
};