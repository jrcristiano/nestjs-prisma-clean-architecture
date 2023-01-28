import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/@core/application/dto/requests/users/create-user.dto';
import { UpdateUserDto } from 'src/@core/application/dto/requests/users/update-user.dto';
import { UsersUseCase } from 'src/@core/application/use-cases/users.usecase';

@Controller('users')
export class UsersController {
	constructor(private readonly usersUseCase: UsersUseCase) {}

	@Get()
	async index() {
		return await this.usersUseCase.getAll();
	}

	@Get(':id')
	async show(@Param('id') id: string) {
		return await this.usersUseCase.findById(id);
	}

	@Post()
	async store(@Body() createUserDto: CreateUserDto) {
		return await this.usersUseCase.create(createUserDto);
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return await this.usersUseCase.update(id, updateUserDto);
	}

	@Delete(':id')
	async destroy(@Param('id') id: string) {
		return await this.usersUseCase.destroy(id);
	}
}
