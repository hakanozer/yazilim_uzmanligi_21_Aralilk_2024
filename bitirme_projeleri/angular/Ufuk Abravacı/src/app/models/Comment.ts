import { PublicUser } from "./User";

export interface CommentModel {
  id: number;
  courseId: number;
  userId: number;
  date: string;
  text: string;
  user?: PublicUser;
}

export interface CommentCreateDTO {
  courseId: number;
  userId: number;
  date: string;
  text: string;
}

export interface CommentWithUserModel extends CommentModel {
  user: PublicUser
} //user dahil olan commentmodel. commentmodeli genişlediyoruz user ekleyerek.