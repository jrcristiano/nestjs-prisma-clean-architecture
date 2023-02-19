import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { DatabaseService } from 'src/@core/infra/databases/prisma/database.service';
import { UsersUseCase } from './users.use-case';
import { User } from 'src/@core/domain/entities/users/user.entity';
import { UpdateUserDto } from '../../dto/requests/users/update-user.dto';
import { UserResponseDto } from '../../dto/responses/users/user.dto';

describe('UsersUseCase', () => {
	const usersUseCase = new UsersUseCase(
		new UserRepository(new DatabaseService()),
	);

	const createUserDto = User.create({
		name: 'Cristiano',
		lastname: 'Junior',
		email: 'cristiano.junior.test@server.com',
		password: '12345678',
	}).getUser();

	it('should be defined', () => {
		expect(usersUseCase).toBeDefined();
	});

	it('should create a new user', async () => {
		const createdUser = await usersUseCase.create(createUserDto);
		expect(createdUser).toBeDefined();
		expect(createdUser).toBeInstanceOf(Object);
	});

	it('should find all users', async () => {
		const users = await usersUseCase.getAll();
		expect(users).toBeDefined();
		expect(users).toBeInstanceOf(Array<UserRepository>);
	});

	it('should find a user by id', async () => {
		const user = await usersUseCase.findById(createUserDto.id);
		expect(user).toBeDefined();
	});

	it('should update a user by id', async () => {
		const userEntityUpdate = User.create({
			id: createUserDto.id,
			name: 'Cristiano',
			lastname: 'Justino',
			email: 'cristiano.junior.test@server.com',
		}).getUser() as UpdateUserDto;

		const user = await usersUseCase.update(createUserDto.id, userEntityUpdate);
		expect(user).toBeDefined();
		expect(user.lastname).toBe('Justino');
	});

	it('should delete a user by id', async () => {
		const removedUser = await usersUseCase.destroy(createUserDto.id);
		expect(removedUser).toBeDefined();
	});

	it('should truncate table users', async () => {
		const truncateUsers = await usersUseCase.truncate();
		expect(truncateUsers).toBeDefined();
		expect(truncateUsers).toBeInstanceOf(Array<UserResponseDto>);
	});
});
