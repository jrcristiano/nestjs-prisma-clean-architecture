import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { DatabaseService } from 'src/@core/infra/databases/prisma/database.service';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.use-case';
import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';

describe('UsersController', () => {
	let controller: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				DatabaseService,
				{
					provide: UsersUseCase,
					useFactory: (databaseService: DatabaseService) => {
						return new UsersUseCase(new UserRepository(databaseService));
					},
					inject: [DatabaseService],
				},
			],
		}).compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
