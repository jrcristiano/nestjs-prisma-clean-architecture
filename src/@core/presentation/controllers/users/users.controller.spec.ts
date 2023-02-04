import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.usecase';
import { UserRepository } from 'src/@core/infra/database/prisma/repositories/users/user.repository';

describe('UsersController', () => {
	let controller: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				PrismaService,
				{
					provide: UsersUseCase,
					useFactory: (prismaService: PrismaService) => {
						return new UsersUseCase(new UserRepository(prismaService));
					},
					inject: [PrismaService],
				},
			],
		}).compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
