import bcrypt from "bcrypt"; // npm install --save-dev @types/bcrypt
export const hashValue = async (value: string, saltRounds?: number) => bcrypt.hash(value, saltRounds || 10);

//bcrypt is a asynchronous
export const compareValue = (value: string, hashedValue: string) =>  bcrypt.compare(value, hashedValue).catch(() => false)
