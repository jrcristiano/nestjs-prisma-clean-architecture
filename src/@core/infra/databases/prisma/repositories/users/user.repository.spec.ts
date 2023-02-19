import { UserResponseDto } from 'src/@core/application/dto/responses/users/user.dto';
import { DatabaseService } from '../../database.service';
import { UserRepository } from './user.repository';
import { User } from 'src/@core/domain/entities/users/user.entity';

describe('UserRepository', () => {
	const userRepository = new UserRepository(new DatabaseService());

	const userEntity = User.create({
		name: 'Cristiano',
		lastname: 'Junior',
		email: 'cristiano.junior.test@server.com',
		password: '12345678',
	}).getUser();

	it('should be defined', () => {
		expect(userRepository).toBeDefined();
	});

	it('should truncate table users', async () => {
		const truncateUsers = await userRepository.truncate();
		expect(truncateUsers).toBeDefined();
		expect(truncateUsers).toBeInstanceOf(Array<UserResponseDto>);
	});

	it('should create a new user', async () => {
		const createdUser = await userRepository.create(userEntity);
		expect(createdUser).toBeDefined();
		expect(createdUser).toBeInstanceOf(Object);
	});

	it('should find all users', async () => {
		const users = await userRepository.getAll();
		expect(users).toBeDefined();
		expect(users).toBeInstanceOf(Array<UserRepository>);
	});

	it('should find a user by id', async () => {
		const user = await userRepository.findById(userEntity.id);
		expect(user).toBeDefined();
	});

	it('should update a user by id', async () => {
		const user = User.create({
			id: userEntity.id,
			name: 'Cristiano',
			lastname: 'Justino',
			email: 'cristiano.junior.test@server.com',
		}).getUser();

		const updatedUser = await userRepository.update(userEntity.id, user);
		expect(updatedUser).toBeDefined();
		expect(updatedUser.lastname).toBe('Justino');
	});

	it('should delete a user by id', async () => {
		const removedUser = await userRepository.destroy(userEntity.id);
		expect(removedUser).toBeDefined();
	});

	it('should try to find a nonexistent user', async () => {
		const user = await userRepository.findById(userEntity.id);
		expect(user).toBeNull();
	});
});
