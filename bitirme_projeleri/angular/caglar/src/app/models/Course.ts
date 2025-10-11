export interface Course {
  id: number;
  coursesTitle: string;
  icon: string;
  description: string;
  Instructor: string;
  InstructorId: string;
  stars?: number;
  newComment?: string; // Yeni comment için geçici alan
  comments?: Array<{
    userId: string;
    userName?: string;
    comment: string;
    date: string;
  }>;
}