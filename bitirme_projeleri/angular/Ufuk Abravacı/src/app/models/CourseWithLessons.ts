import { Lesson } from "./Lesson"

export interface CourseWithLessons {
    id: number,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    instructorId: number
    lessons?: Lesson[]
}