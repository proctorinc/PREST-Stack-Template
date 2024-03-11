export enum UserRole {
  Guest = "GUEST",
  User = "USER",
  Admin = "ADMIN",
}

export type UpdateUserProfileInput = {
  color?: string;
  name?: string;
};

export type CreateUserInput = {
  name: string;
  color?: string;
  email: string;
};
