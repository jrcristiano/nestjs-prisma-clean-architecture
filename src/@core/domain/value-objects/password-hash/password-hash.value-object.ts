import { compareSync, hashSync } from 'bcryptjs';

const PASSWORD_SALT = 12;

export function passwordHash(password: string) {
	return hashSync(password, PASSWORD_SALT);
}

export function comparePassword(password: string, hash: string) {
	return compareSync(password, hash);
}
