import { User } from './user.entity';

describe('UserEntity', () => {
	const entity = User.create({
		name: 'Cristiano',
		lastname: 'Junior',
		email: 'cristiano-junior10@outlook.com',
		password: 'random-password',
	});

	it('should be defined', () => {
		expect(entity).toBeDefined();

		expect(entity.name).toBeDefined();
		expect(entity.lastname).toBeDefined();
		expect(entity.email).toBeDefined();
	});

	it('should not be attributes empty', () => {
		expect(entity.name.length).toBeGreaterThan(1);
		expect(entity.lastname.length).toBeGreaterThan(1);
		expect(entity.email.length).toBeGreaterThan(1);
	});

	it('should be user object', () => {
		expect(typeof entity.getUser() == 'object').toBeTruthy();
	});

	it('should be user json', () => {
		expect(typeof entity.getUserJson() == 'string').toBeTruthy();
	});
});
