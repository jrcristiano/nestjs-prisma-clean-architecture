import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/@core/application/dto/requests/users/create-user.dto';
import { UpdateUserDto } from 'src/@core/application/dto/requests/users/update-user.dto';
import { PrismaService } from '../../prisma.service';
import { UserResponseDto } from 'src/@core/application/dto/responses/users/user.dto';

const columns = {
	id: true,
	name: true,
	lastname: true,
	email: true,
	created_at: true,
	updated_at: true,
};

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(): Promise<UserResponseDto[]> {
		return await this.prisma.user.findMany({
			select: columns,
		});
	}

	async findById(id: string): Promise<UserResponseDto> {
		return await this.prisma.user.findUnique({
			select: columns,
			where: {
				id,
			},
		});
	}

	async findByEmail(email: string): Promise<UserResponseDto> {
		return await this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	async create(data: CreateUserDto): Promise<UserResponseDto> {
		return await this.prisma.user.create({
			select: columns,
			data,
		});
	}

	async update(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
		return await this.prisma.user.update({
			select: columns,
			where: {
				id,
			},
			data,
		});
	}

	async destroy(id: string): Promise<UserResponseDto> {
		return await this.prisma.user.delete({
			select: columns,
			where: {
				id,
			},
		});
	}
}
