export type Role = 'student' | 'instructor';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}
