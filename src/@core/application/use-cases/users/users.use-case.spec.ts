import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { DatabaseService } from 'src/@core/infra/databases/prisma/database.service';
import { UsersUseCase } from './users.use-case';

describe('UsersUseCase', () => {
	it('should be defined', () => {
		const usersUseCase = new UsersUseCase(
			new UserRepository(new DatabaseService()),
		);

		expect(usersUseCase).toBeDefined();
	});
});
