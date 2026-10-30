import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const WEDDING_IMAGES_BUCKET = 'wedding-images';

export function getWeddingAssetUrl(fileName: string) {
  return supabase.storage.from(WEDDING_IMAGES_BUCKET).getPublicUrl(fileName).data.publicUrl;
}

export const getImageUrl = getWeddingAssetUrl;
