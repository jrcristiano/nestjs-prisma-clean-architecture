import { PrismaService } from '../../prisma.service';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
	const userRepository = new UserRepository(new PrismaService());
	it('should be defined', () => {
		expect(userRepository).toBeDefined();
	});
});
