import {
	Module,
	NestModule,
	RequestMethod,
	MiddlewareConsumer,
} from '@nestjs/common';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.usecase';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { UsersController } from 'src/@core/presentation/controllers/users/users.controller';
import { FindUserMiddleware } from 'src/@core/infra/framework/nestjs/modules/users/middlewares/find-user/find-user.middleware';
import { UserRepository } from 'src/@core/infra/database/prisma/repositories/users/user.repository';
import { EmailAlreadyUsedRule } from 'src/@core/infra/validations/rules/email-already-used';

@Module({
	imports: [],
	controllers: [UsersController],
	providers: [
		PrismaService,
		UsersUseCase,
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
