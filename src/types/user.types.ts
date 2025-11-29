interface Role {
  role: 'USER' | 'ADMIN' | 'SUPPER_ADMIN';
}

export interface IUser {
  id: string;
  email: string;
  full_name: string;
  role: Role[];
}
