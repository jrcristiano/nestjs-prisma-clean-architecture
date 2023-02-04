import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { AuthUseCase } from 'src/@core/application/use-cases/auth/auth.usecase';
import { AuthController } from 'src/@core/presentation/controllers/auth/auth.controller';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.usecase';
import { UserRepository } from 'src/@core/infra/database/prisma/repositories/users/user.repository';
import { AuthorizationStrategy } from './strategies/authorization/authorization.strategy';
import { AuthenticationStrategy } from './strategies/authentication/authentication.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: env.JWT_EXPIRES_IN },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthenticationStrategy,
		AuthorizationStrategy,
		AuthUseCase,
		UsersUseCase,
		UserRepository,
		PrismaService,
	],
})
export class AuthModule {}
