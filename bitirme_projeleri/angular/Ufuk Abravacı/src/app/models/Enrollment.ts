import { Course } from "./Course";

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  course?: Course;
} //?_expand diyince course?: Course alanı da ekleniyor json-serverda

export interface EnrollmentCreateDTO {
  userId: number;
  courseId: number;
}