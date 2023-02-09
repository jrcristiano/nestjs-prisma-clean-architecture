import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthUseCase } from 'src/@core/application/use-cases/auth/auth.usecase';
import { JwtService } from '@nestjs/jwt';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.use-case';
import { DatabaseService } from 'src/@core/infra/databases/prisma/database.service';
import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				DatabaseService,
				UserRepository,
				UsersUseCase,
				JwtService,
				AuthUseCase,
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
