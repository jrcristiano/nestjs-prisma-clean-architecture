import { UserRepository } from 'src/@core/infra/database/prisma/repositories/users/user.repository';
import { UsersUseCase } from '../users/users.usecase';
import { AuthUseCase } from './auth.usecase';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthUseCase', () => {
	const authUseCase = new AuthUseCase(
		new UsersUseCase(new UserRepository(new PrismaService())),
		new JwtService(),
	);
	it('should be defined', () => {
		expect(authUseCase).toBeDefined();
	});
});
