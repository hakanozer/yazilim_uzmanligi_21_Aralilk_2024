export interface ILesson {
  id: string;           // Dersin benzersiz kimliği, string
  title: string;
  content: string;
  courseId: string;     // Hangi kursa ait, string
}

// Ders ekleme (POST) işlemi için ID'yi dışlayan tip
export type ILessonCreate = Omit<ILesson, 'id'>;
