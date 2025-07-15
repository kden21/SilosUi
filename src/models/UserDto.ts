export interface UserDto{
  userName: string;
  role: UserRole;
  token: string;
}

export enum UserRole {
  User = 0,
  Admin = 1,
}
