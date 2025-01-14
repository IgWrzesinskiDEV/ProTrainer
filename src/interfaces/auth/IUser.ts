export interface IUser {
  userName: string;
  email: string;
  password: string;
  role: "user" | "coach" | "admin";
}
