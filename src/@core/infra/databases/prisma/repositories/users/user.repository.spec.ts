import { DatabaseService } from '../../database.service';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
	const userRepository = new UserRepository(new DatabaseService());
	it('should be defined', () => {
		expect(userRepository).toBeDefined();
	});
});
