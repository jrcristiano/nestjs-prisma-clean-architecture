import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { AuthUseCase } from 'src/@core/application/use-cases/auth/auth.usecase';
import { AuthController } from 'src/@core/presentation/controllers/auth/auth.controller';
import { DatabaseService } from 'src/@core/infra/databases/prisma/database.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.use-case';
import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { AuthorizationStrategy } from './strategies/authorization/authorization.strategy';
import { AuthenticationStrategy } from './strategies/authentication/authentication.strategy';
import { JwtService } from '@nestjs/jwt';

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
		{
			provide: AuthUseCase,
			useFactory: (
				databaseService: DatabaseService,
				jwtService: JwtService,
			) => {
				return new AuthUseCase(
					new UsersUseCase(new UserRepository(databaseService)),
					jwtService,
				);
			},
			inject: [DatabaseService, JwtService],
		},
		{
			provide: UsersUseCase,
			useFactory: (databaseService: DatabaseService) => {
				return new UsersUseCase(new UserRepository(databaseService));
			},
			inject: [DatabaseService],
		},
		UserRepository,
		DatabaseService,
	],
})
export class AuthModule {}
