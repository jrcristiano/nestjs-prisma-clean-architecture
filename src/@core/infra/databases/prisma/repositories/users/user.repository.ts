import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { UserResponseDto } from 'src/@core/application/dto/responses/users/user.dto';
import { User } from 'src/@core/domain/entities/users/user.entity';

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
	constructor(private readonly db: DatabaseService) {}

	async getAll(): Promise<UserResponseDto[]> {
		return await this.db.user.findMany({
			select: columns,
		});
	}

	async findById(id: string): Promise<UserResponseDto> {
		return await this.db.user.findUnique({
			select: columns,
			where: {
				id,
			},
		});
	}

	async findByEmail(email: string): Promise<UserResponseDto> {
		return await this.db.user.findUnique({
			where: {
				email,
			},
		});
	}

	async create(data: User): Promise<UserResponseDto> {
		return await this.db.user.create({
			select: columns,
			data,
		});
	}

	async update(id: string, data: User): Promise<UserResponseDto> {
		return await this.db.user.update({
			select: columns,
			where: {
				id,
			},
			data,
		});
	}

	async destroy(id: string): Promise<UserResponseDto> {
		return await this.db.user.delete({
			select: columns,
			where: {
				id,
			},
		});
	}

	async truncate() {
		await this.db.user.deleteMany({});
		return [] as UserResponseDto[];
	}
}
