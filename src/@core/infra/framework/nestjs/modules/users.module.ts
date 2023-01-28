import { Module } from '@nestjs/common';
import { UsersUseCase } from 'src/@core/application/use-cases/users.usecase';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { UserRepository } from '../../../database/prisma/repositories/user.repository';
import { EmailAlreadyUsedRule } from 'src/@core/infra/validations/rules/email-already-used';
import { UsersController } from 'src/@core/presentation/controllers/users/users.controller';

@Module({
	imports: [],
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
		{
			provide: EmailAlreadyUsedRule,
			useFactory: (usersUseCase: UsersUseCase) => {
				return new EmailAlreadyUsedRule(usersUseCase);
			},
			inject: [UsersUseCase],
		},
	],
})
export class UsersModule {}
