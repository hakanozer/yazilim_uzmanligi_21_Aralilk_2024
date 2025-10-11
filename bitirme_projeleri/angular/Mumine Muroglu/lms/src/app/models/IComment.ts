export interface IComment {
  id: string;        // Comment ID, string
  courseId: string;  // Hangi kursa ait, string
  userId: string;    // Yorum yapan kullanıcı ID, string
  text: string;      // Yorum içeriği
  date: string;      // Oluşturulma tarihi (ISO string)
  authorName?: string;
}

export interface Pagination {
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}

export type ICommentCreate = Omit<IComment, 'id' | 'date'>;