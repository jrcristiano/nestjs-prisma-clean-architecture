import { hashSync } from 'bcryptjs';

export function passwordHash(password: string, PASSWORD_SALT = 12) {
	return hashSync(password, PASSWORD_SALT);
}
