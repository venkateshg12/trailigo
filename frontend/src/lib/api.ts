import API from "@/config/appClient";
// import type { User } from "@/constants/constant";


export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const register = async (data: RegisterData) => {
    return API.post("/auth/register", data);
};