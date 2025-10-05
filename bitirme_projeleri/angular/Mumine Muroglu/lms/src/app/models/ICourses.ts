import { ILesson } from "./ILessons";

export interface ICourse {
  id: string;           // Kursun benzersiz kimliği, artık string
  title: string;        // Kurs adı
  description: string;  // Kurs açıklaması
  instructorName?:string;
  instructorId: string; // Eğitmen id'si (user tablosuna referans), string
  image?: string;       // Kurs görseli URL'si (opsiyonel ama tavsiye edilir)
  lessons?: ILesson[];
}
export interface Pagination {
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}


// Kurs ekleme (POST) işlemi için ID'yi dışlayan tip
export type ICourseCreate = Omit<ICourse, 'id'>;
