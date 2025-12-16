const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;

    if (value == undefined) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value;
}

export default getEnv;

export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const MONGO_URI = getEnv("MONGO_URI");
export const USER_EMAIL = getEnv("USER_EMAIL");
export const USER_PASSWORD = getEnv("USER_PASSWORD");
export const JWT_REFRESH_KEY = getEnv("JWT_REFRESH_KEY");
export const JWT_SECRET_KEY = getEnv("JWT_SECRET_KEY");
export const NODE_ENV = getEnv("NODE_ENV");
export const GOOGLE_CLIENT_ID = getEnv("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = getEnv("GOOGLE_CLIENT_SECRET");
export const CALLBACK_URL = getEnv("CALLBACK_URL");
export const ARCJET_KEY = getEnv("ARCJET_KEY");