import { User } from './user.entity';

describe('UserEntity', () => {
	it('should be defined', () => {
		const entity = User.create({
			name: 'Cristiano',
			lastname: 'Junior',
			email: 'cristiano-junior10@outlook.com',
		});

		expect(entity).toBeDefined();
	});
});
