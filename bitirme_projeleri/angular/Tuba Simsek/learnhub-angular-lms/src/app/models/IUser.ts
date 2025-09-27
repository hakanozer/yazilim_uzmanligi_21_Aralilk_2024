export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'student' | 'instructor';
}
