import { UsersUseCase } from 'src/@core/application/use-cases/users/users.usecase';
import { FindUserMiddleware } from './find-user.middleware';
import { UserRepository } from 'src/@core/infra/database/prisma/repositories/users/user.repository';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('FindUserMiddleware', () => {
	let middleware: FindUserMiddleware;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PrismaService,
				UsersUseCase,
				UserRepository,
				PrismaService,
				FindUserMiddleware,
			],
		}).compile();

		middleware = module.get<FindUserMiddleware>(FindUserMiddleware);
	});

	it('should be defined', () => {
		expect(middleware).toBeDefined();
	});
});
