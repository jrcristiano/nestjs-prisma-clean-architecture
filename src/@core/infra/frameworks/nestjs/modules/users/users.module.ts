import {
	Module,
	NestModule,
	RequestMethod,
	MiddlewareConsumer,
} from '@nestjs/common';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.use-case';
import { DatabaseService } from '../../../../databases/prisma/database.service';
import { UsersController } from 'src/@core/presentation/controllers/users/users.controller';
import { FindUserMiddleware } from './middlewares/find-user/find-user.middleware';
import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { EmailAlreadyUsedRule } from 'src/@core/infra/validations/rules/email-already-used';

@Module({
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
		UserRepository,
		EmailAlreadyUsedRule,
		FindUserMiddleware,
	],
	exports: [UsersUseCase],
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(FindUserMiddleware)
			.forRoutes({ path: 'users/:id', method: RequestMethod.GET })
			.apply(FindUserMiddleware)
			.forRoutes({ path: 'users/:id', method: RequestMethod.PUT })
			.apply(FindUserMiddleware)
			.forRoutes({ path: 'users/:id', method: RequestMethod.DELETE });
	}
}
