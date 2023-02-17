import { comparePassword, passwordHash } from './password-hash.value-object';

describe('PasswordHashValueObject', () => {
	const password = 'r4nD0m-p455w0Rd';
	const passwordHashed = passwordHash(password);

	it('should be a password defined', () => {
		expect(passwordHashed).toBeDefined();
	});

	it('should be a valid password equals true', () => {
		const validPassword = comparePassword(password, passwordHashed);
		expect(validPassword).toBeTruthy();
	});

	it('should be a valid password equals false', () => {
		const invalidPassword = comparePassword(password, `invalid-${password}`);
		expect(invalidPassword).toBeFalsy();
	});

	it('should be password not empty', () => {
		try {
			const emptyPassword = undefined;
			const passwordHashed = passwordHash(emptyPassword);

			expect(passwordHashed).toBeDefined();
		} catch (error) {
			expect(error.message).toBe('Password cannot be empty, null or undefined');
		}
	});
});
