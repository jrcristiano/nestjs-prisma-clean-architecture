import { UsersUseCase } from 'src/@core/application/use-cases/users/users.use-case';
import { EmailAlreadyUsedRule } from './email-already-used';
import { UserRepository } from '../../databases/prisma/repositories/users/user.repository';
import { DatabaseService } from '../../databases/prisma/database.service';
import { User } from 'src/@core/domain/entities/users/user.entity';
import { CreateUserDto } from 'src/@core/application/dto/requests/users/create-user.dto';

describe('EmailAlreadyUsed', () => {
	const usersUseCase = new UsersUseCase(
		new UserRepository(new DatabaseService()),
	);
	const rule = new EmailAlreadyUsedRule(usersUseCase);

	it('should be defined', async () => {
		expect(rule).toBeDefined();
	});

	it('should be true', async () => {
		const email = 'cristiano.nonexistent@server.com';
		const isEmailAvailable = await rule.validate(email);
		expect(isEmailAvailable).toBeTruthy();
	});

	it('should be false', async () => {
		const createUserDto = {
			name: 'Cristiano',
			lastname: 'Junior',
			email: 'cristiano-junior10@outlook.com',
			password: 'random-password',
		} as CreateUserDto;

		const createdUser = await usersUseCase.create(createUserDto);

		const isEmailUnavailable = await rule.validate(createdUser.email);
		expect(isEmailUnavailable).toBeFalsy();

		await usersUseCase.truncate();
	});

	it('should be a string message', () => {
		const message = rule.defaultMessage();
		expect(message).toBe('Usuário já registrado');
	});
});
