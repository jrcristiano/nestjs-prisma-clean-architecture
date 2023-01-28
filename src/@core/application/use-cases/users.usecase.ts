import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/@core/infra/database/prisma/repositories/user.repository';
import { CreateUserDto } from '../dto/requests/users/create-user.dto';
import { UpdateUserDto } from '../dto/requests/users/update-user.dto';
import { User } from 'src/@core/domain/entities/user.entity';
import { UserResponseDto } from '../dto/responses/users/user-response.dto';

@Injectable()
export class UsersUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async getAll() {
		const users = await this.userRepository.getAll();
		return users as UserResponseDto[];
	}

	async findById(id: string) {
		return await this.userRepository.findById(id);
	}

	async findByEmail(email: string) {
		email = email.toLowerCase();

		const user = await this.userRepository.findByEmail(email);
		return user as UserResponseDto;
	}

	async create(createUserDto: CreateUserDto) {
		const userEntity = User.create(createUserDto).getUser() as CreateUserDto;

		await this.userRepository.create(userEntity);
		return userEntity as UserResponseDto;
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const userEntity = User.create(updateUserDto).getUser() as UpdateUserDto;
		await this.userRepository.update(id, userEntity);

		return userEntity as UserResponseDto;
	}

	async destroy(id: string) {
		const user = await this.userRepository.findById(id);

		await this.userRepository.destroy(id);

		const userEntity = User.create(user).getUser() as UserResponseDto;
		return userEntity as UserResponseDto;
	}
}
