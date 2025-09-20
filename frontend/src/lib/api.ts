import API from "@/config/appClient";
// import type { User } from "@/constants/constant";


export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface VerificationData {
    userId: string,
    code: string,
}
export interface loginData {
    email : string,
    password : string,
}
export const register = async (data: RegisterData) => {
    return API.post("/auth/register", data);
};


export const onSubmit = async (data: VerificationData) => {
    return API.post("/auth/verify-email", data);
}

export const login = async(data : loginData) => {
    return API.post("/auth/login", data);
}

export const logOut = async() =>{
    return API.post("/auth/logout");
}

type User = {
    id : string,
    email : string,
    name : string,
    verified : boolean
}

export const fetchUser = async ():Promise<User> => {
    console.log("fetchUser called");
    try {
        const res = await API.get("/auth/user", { withCredentials: true });
        console.log("Backend response:", res.data);
        return res.data;
    } catch (err) {
        console.log("Error fetching user:", err);
        throw err; // still let React Query know an error happened
    }
}

export const googleLogin = async() => {
    return API.get("/auth/google");
}