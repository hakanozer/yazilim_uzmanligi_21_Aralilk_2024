export interface IUserProfile {
    id: number;
    name: string;
    username?: string;
    email: string;
    password?: string;
    role: 'student' | 'instructor';
    profile?: string;
}
