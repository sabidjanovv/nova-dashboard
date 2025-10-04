export interface Image {
  id: number;
  collection_id: number;
  image_url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  type: "interior" | "exterior";
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: number;
  added_admin_id: number;
  title: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  description: string;
  main_image_id: number;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  mainImage: Image;
  images: Image[];
  category: Category;
}

// ✅ faqat form uchun DTO
export interface CollectionDto {
  title: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  category_id: number;
  files?: FileList | null;
}


export interface TeamRequest {
  full_name: string;
  position?: string;
  description?: string;
  phone?: string;
  is_active: boolean;
  file?: File; // shu qator muammoni yechadi
}