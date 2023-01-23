import { hashSync } from "bcrypt";

export function passwordHash(password: string, PASSWORD_SALT = 12) {
  return hashSync(password, PASSWORD_SALT);
}