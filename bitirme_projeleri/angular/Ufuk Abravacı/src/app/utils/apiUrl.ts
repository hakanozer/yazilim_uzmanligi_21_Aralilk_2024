const baseURL = "http://localhost:3000";

export const endpoints = {
  // Auth
  auth: {
    login: `${baseURL}/login`,       // POST
    register: `${baseURL}/register`, // POST
    // Profil -> login sonrası user.id ile:
    profile: (userId: number) => `${baseURL}/600/users/${userId}`,
  },

  // Users
  users: {
    list: `${baseURL}/users`,
    listPagination: (page:number = 1, limit:number = 9) => `${baseURL}/users?_page=${page}&_limit=${limit}&_sort=id&_order=desc`,
    getPublicUserById:(id:number) => `${endpoints.users.list}/${id}`,
    detail: (id: number) => `${baseURL}/600/users/${id}`,
    getInstructors: (page:number = 1, limit:number = 9) => `${baseURL}/users?role=instructor&_page=${page}&_limit=${limit}`
  },

  // Courses
  courses: {
    list: `${baseURL}/courses`,         // GET
    withLessons: (id: number) => `${baseURL}/courses/${id}?_embed=lessons`,
    listPagination: (page:number = 1, limit:number = 9) => `${baseURL}/courses?_page=${page}&_limit=${limit}&_sort=id&_order=desc`,
    detail: (id: number) => `${baseURL}/courses/${id}`, // GET tek kurs
    create: `${baseURL}/courses`,       // POST
    update: (id: number) => `${baseURL}/courses/${id}`, // PUT/PATCH
    delete: (id: number) => `${baseURL}/courses/${id}`, // DELETE
    getCoursesWithInstructorId: (id:number, page:number = 1, limit:number = 10) => `${baseURL}/courses?instructorId=${id}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`
  },

  // Lessons
  lessons: {
    list: `${baseURL}/lessons`,
    detail: (id: number) => `${baseURL}/lessons/${id}`,
    byCourseId: (courseId: number) => `${baseURL}/lessons?courseId=${courseId}`,
    create: `${baseURL}/lessons`, //POST
    update: (id:number) => `${baseURL}/lessons/${id}`, //put
    delete: (id:number) => `${baseURL}/lessons/${id}`, //delete
  },

  // Enrollments
  enrollments: {
    create: `${baseURL}/enrollments`, //POST
    list: `${baseURL}/enrollments`, //GET
    delete: (id: number) => `${baseURL}/enrollments/${id}`, //delete
    detail: (id: number) => `${baseURL}/enrollments/${id}`,
    byUserId: (userId: number) => `${baseURL}/enrollments?userId=${userId}`,
    byUserIdEnrollmentsWithCourses: (userId: number, page:number=1, limit:number = 10) => `${baseURL}/enrollments?userId=${userId}&_expand=course&_page=${page}&_limit=${limit}`,
    byCourseId: (courseId: number) => `${baseURL}/enrollments?courseId=${courseId}`,
    isEnrolled: (courseId: number, userId:number) => `${baseURL}/enrollments?userId=${userId}&courseId=${courseId}`
  },

  // Comments
  comments: {
    add: `${baseURL}/comments`, //post
    delete: (id: number) => `${baseURL}/comments/${id}`, //delete
    byCourseId: (courseId: number) => `${baseURL}/comments?courseId=${courseId}`,
    byUserId: (userId: number) => `${baseURL}/comments?userId=${userId}`,
    byCourseIdwithUser: (courseId: number) => `${baseURL}/comments?courseId=${courseId}&_expand=user`
  },
};