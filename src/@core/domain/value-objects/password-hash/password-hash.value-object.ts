import { compareSync, hashSync } from 'bcryptjs';

const PASSWORD_SALT = 12;

export function passwordHash(password: string) {
	password = issetPassword(password);
	return hashSync(password, PASSWORD_SALT);
}

export function comparePassword(password: string, hash: string) {
	password = issetPassword(password);
	return compareSync(password, hash);
}

export function issetPassword(password: string): string {
	if (!password) {
		throw new Error('Password cannot be empty, null or undefined');
	}

	return password;
}
