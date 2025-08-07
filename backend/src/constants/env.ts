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
