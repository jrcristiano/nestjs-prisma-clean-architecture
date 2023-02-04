import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/@core/application/dto/requests/users/create-user.dto';
import { UpdateUserDto } from 'src/@core/application/dto/requests/users/update-user.dto';
import { PrismaService } from '../prisma.service';

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

	async getAll() {
		return await this.prisma.user.findMany({
			select: columns,
		});
	}

	async findById(id: string) {
		return await this.prisma.user.findUnique({
			select: columns,
			where: {
				id,
			},
		});
	}

	async findByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	async create(data: CreateUserDto) {
		return await this.prisma.user.create({
			data,
		});
	}

	async update(id: string, data: UpdateUserDto) {
		return await this.prisma.user.update({
			where: {
				id,
			},
			data,
		});
	}

	async destroy(id: string) {
		return await this.prisma.user.delete({
			where: {
				id,
			},
		});
	}
}
