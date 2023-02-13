import { comparePassword, passwordHash } from './password-hash.value-object';

describe('PasswordHashValueObject', () => {
	const password = 'random-password-test';

	const passwordHashed = passwordHash(password);
	const validPassword = comparePassword(password, passwordHashed);
	const invalidPassword = comparePassword(password, `invalid-${password}`);

	it('should be a password defined', () => {
		expect(passwordHashed).toBeDefined();
	});

	it('should be a valid password equals true', () => {
		expect(validPassword).toBeTruthy();
	});

	it('should be a valid password equals false', () => {
		expect(invalidPassword).toBeFalsy();
	});
});
