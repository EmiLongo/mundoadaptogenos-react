import { supabase } from "@/api/apiClient";
import { Section } from "@/types/SectionTypes";
import { useEffect, useState } from "react";

export const useSections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from('sections').select();
        if (error) throw error;
        setSections(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, []);

  return { sections, isLoading, error };
};