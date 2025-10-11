export interface UserModel {
  id: number;
  email: string;
  password: string;
  fullName: string;
  role: 'student' | 'instructor';
}

export interface UserRegisterDto {
  email: string;
  password: string;
  fullName: string;
  role: "student" | "instructor";
}

//password kısmı olmayan localstorage vs ekleyebileceğimiz public edilebilecek user.
//Backend UserModel döndüğünde password kısmını dönmez. Type sıkıntısı yaşamamak için önlem aldık.
//Omit kullanmanın sebebi eğer UserModelde bir değişiklik olursa aynı değişikliği bir de publicuserda yapmamak.
export type PublicUser = Omit<UserModel, 'password'>;
//password gereken login/register componentleri hariç componentler PublicUser kullanacak.