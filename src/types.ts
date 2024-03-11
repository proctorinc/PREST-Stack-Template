export type User = {
  id: String;
  name: String;
  color: String;
  email?: String;
  role: UserRole;
  createdAt: Date;
  enabled: Boolean;
};

export enum UserRole {
  Guest = "GUEST",
  User = "USER",
  Admin = "ADMIN",
}

export type LoginRequest = {
  email: string;
  token: string;
};
