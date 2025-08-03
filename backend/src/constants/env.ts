const getEnv = (key : string , defaultValue ?: string): string => {
    const value = process.env[key] || defaultValue;

    if(value == undefined) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value;
}

export default getEnv;

export const APP_ORIGIN = getEnv("APP_ORIGIN");