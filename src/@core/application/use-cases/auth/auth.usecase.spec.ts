import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { UsersUseCase } from '../users/users.use-case';
import { AuthUseCase } from './auth.usecase';
import { DatabaseService } from 'src/@core/infra/databases/prisma/database.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthUseCase', () => {
	const authUseCase = new AuthUseCase(
		new UsersUseCase(new UserRepository(new DatabaseService())),
		new JwtService(),
	);

	it('should be defined', () => {
		expect(authUseCase).toBeDefined();
	});
});
