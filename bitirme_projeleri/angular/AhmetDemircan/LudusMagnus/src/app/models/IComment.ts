export interface IComment {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
  isApproved: boolean;
}

// Factory function - Yeni yorum oluşturmak için
export function createEmptyComment(): IComment {
  return {
    id: '0', 
    courseId: '',
    userId: '',
    userName: '',
    userEmail: '',
    rating: 5,
    comment: '',
    createdAt: new Date().toISOString(),
    isApproved: false
  };
}