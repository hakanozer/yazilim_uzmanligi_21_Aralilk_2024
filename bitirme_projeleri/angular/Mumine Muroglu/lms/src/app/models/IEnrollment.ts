import { ICourse } from "./ICourses";

export interface IEnrollment {
    id: string;          // Enrollment ID, string
    userId: string;      // Kullanıcı ID, string
    courseId: string;    // Kurs ID, string
    course?: ICourse;
}
