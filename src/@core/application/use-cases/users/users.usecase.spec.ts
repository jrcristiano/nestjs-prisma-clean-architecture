import { UserRepository } from 'src/@core/infra/database/prisma/repositories/users/user.repository';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { UsersUseCase } from './users.usecase';

describe('UsersUseCase', () => {
	it('should be defined', () => {
		const usersUseCase = new UsersUseCase(
			new UserRepository(new PrismaService()),
		);

		expect(usersUseCase).toBeDefined();
	});
});
