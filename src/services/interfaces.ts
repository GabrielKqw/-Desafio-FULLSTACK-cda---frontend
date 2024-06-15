/** @format */

export interface UserLogin {
  email: string;
  password: string;
}

export interface RegisterUser {
  name: string;
  nickname: "";
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  profileImage?: string;
}

export interface UserType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  isAdmin?: boolean;
  profileImage?: string;
}
