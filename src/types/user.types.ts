interface Role {
  role: 'USER' | 'ADMIN' | 'SUPPER_ADMIN';
}

export interface IUser {
  email: string;
  full_name: string;
  role: Role[];
  phone: string;
}
