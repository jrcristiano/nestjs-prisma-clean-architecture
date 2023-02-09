import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { CreateUserDto } from '../../dto/requests/users/create-user.dto';
import { UpdateUserDto } from '../../dto/requests/users/update-user.dto';
import { User } from 'src/@core/domain/entities/users/user.entity';

export class UsersUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async getAll() {
		return await this.userRepository.getAll();
	}

	async findById(id: string) {
		return await this.userRepository.findById(id);
	}

	async findByEmail(email: string) {
		return await this.userRepository.findByEmail(email);
	}

	async create(createUserDto: CreateUserDto) {
		const userEntity = User.create(createUserDto).getUser();
		return await this.userRepository.create(userEntity);
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const userEntity = User.create(updateUserDto).getUser();
		return await this.userRepository.update(id, userEntity);
	}

	async destroy(id: string) {
		return await this.userRepository.destroy(id);
	}
}
