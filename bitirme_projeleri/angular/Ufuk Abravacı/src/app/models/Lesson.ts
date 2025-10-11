export interface Lesson {
id: number;
courseId: number;
title: string;
videoUrl: string;
duration: string;
}

export interface LessonCreateDTO {
courseId: number;
title: string;
videoUrl: string;
duration: string;
}