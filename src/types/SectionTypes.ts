export interface Section {
  id: number;
  title: string;
  slug: string;
  is_active: boolean;
  date_active_start: string | null; // ISO date string o null
  date_active_end: string | null;   // ISO date string o null
  section_discount: number;
  priority: number;
  created_at: string;  // timestamp ISO
  updated_at: string;  // timestamp ISO
}
