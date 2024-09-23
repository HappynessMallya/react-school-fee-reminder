import NextAuth from "next-auth";
import { Session } from "next-auth";
declare module "next-auth" {
  
  interface User {
    id: number;
    email: string;
    role: Role;
  }
    interface Session {
      user: User;
    }
    
}
declare module "next-auth/react" {
  interface SignInResponse {
    error?: string;
    user?: {
      id: number; // or string depending on your ID type
      email: string;
      role: Role; // assuming Role is your enum type
    };
  }
}