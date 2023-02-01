import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { AuthUseCase } from 'src/@core/application/use-cases/auth.usecase';
import { AuthController } from 'src/@core/presentation/controllers/auth/auth.controller';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { UsersUseCase } from 'src/@core/application/use-cases/users.usecase';
import { UserRepository } from 'src/@core/infra/database/prisma/repositories/user.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: '3600s' },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthUseCase,
		LocalStrategy,
		JwtStrategy,
		PrismaService,
		{
			provide: UsersUseCase,
			useFactory: (prismaService: PrismaService) => {
				return new UsersUseCase(new UserRepository(prismaService));
			},
			inject: [PrismaService],
		},
	],
})
export class AuthModule {}
