import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthController } from './auth.controller';
import { AuthUseCase } from 'src/@core/application/use-cases/auth/auth.usecase';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.use-case';
import { DatabaseService } from 'src/@core/infra/databases/prisma/database.service';
import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { AuthenticationStrategy } from 'src/@core/infra/frameworks/nestjs/modules/auth/strategies/authentication/authentication.strategy';
import { AuthorizationStrategy } from 'src/@core/infra/frameworks/nestjs/modules/auth/strategies/authorization/authorization.strategy';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process';

describe('AuthController', () => {
	let app: INestApplication;
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
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
		}).compile();

		app = module.createNestApplication();
		await app.init();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('/login (POST)', async () => {
		const usersUseCase = new UsersUseCase(
			new UserRepository(new DatabaseService()),
		);

		const createUserDto = {
			name: 'Cristiano',
			lastname: 'Junior',
			email: 'cristiano.junior.test2@server.com',
			password: '12345678',
		};

		const findUser = await usersUseCase.findByEmail(createUserDto.email);
		if (!findUser) {
			await usersUseCase.create(createUserDto);
		}

		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ email: createUserDto.email, password: createUserDto.password })
			.expect(201);
	});
});
