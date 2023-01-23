import { hash } from "bcryptjs";

export async function passwordHash(password: string, PASSWORD_SALT = 12) {
  return await hash(password, PASSWORD_SALT);
}