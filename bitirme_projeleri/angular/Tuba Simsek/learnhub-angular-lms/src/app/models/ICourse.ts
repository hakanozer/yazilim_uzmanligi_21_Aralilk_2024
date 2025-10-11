export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    instructorId: number;
    image: string;
    category: string;
    rating: number;
    students: number;
    price: number;
    videoUrl: string;
}


export interface Pagination {
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}