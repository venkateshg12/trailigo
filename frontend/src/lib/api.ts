import API from "@/config/appClient";
// import type { User } from "@/constants/constant";


export interface RegisterData {
   email: string;
   password: string;
   confirmPassword: string
   // Add other fields as needed, e.g., name, username, etc.
}

export const register = async (data: RegisterData) => {
   return API.post("/auth/register", data);
};