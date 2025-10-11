export interface Course {
    id: number,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    instructorId: number
}

export interface CourseCreateDTO {
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    instructorId: number
}