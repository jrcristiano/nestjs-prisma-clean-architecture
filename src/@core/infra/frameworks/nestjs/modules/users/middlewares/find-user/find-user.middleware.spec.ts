import { UsersUseCase } from 'src/@core/application/use-cases/users/users.use-case';
import { FindUserMiddleware } from './find-user.middleware';
import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { DatabaseService } from 'src/@core/infra/databases/prisma/database.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('FindUserMiddleware', () => {
	let middleware: FindUserMiddleware;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DatabaseService,
				UsersUseCase,
				UserRepository,
				FindUserMiddleware,
			],
		}).compile();

		middleware = module.get<FindUserMiddleware>(FindUserMiddleware);
	});

	it('should be defined', () => {
		expect(middleware).toBeDefined();
	});
});
