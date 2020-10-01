// enum Gender {
//   m = 'Male',
//   f = 'Female'
// }

export interface IContact {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
  created_at: Date;
  update_at: Date;
  isFavoris?: boolean;
}


