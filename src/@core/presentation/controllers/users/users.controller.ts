import { Controller } from '@nestjs/common';
import {
	Body,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/@core/application/dto/requests/users/create-user.dto';
import { UpdateUserDto } from 'src/@core/application/dto/requests/users/update-user.dto';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.usecase';
import { AuthorizationGuard } from 'src/@core/infra/framework/nestjs/modules/auth/guards/authorization/authorization.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly usersUseCase: UsersUseCase) {}

	@Get()
	@UseGuards(AuthorizationGuard)
	async index() {
		return await this.usersUseCase.getAll();
	}

	@Get(':id')
	@UseGuards(AuthorizationGuard)
	async show(@Param('id') id: string) {
		return await this.usersUseCase.findById(id);
	}

	@Post()
	@UseGuards(AuthorizationGuard)
	async store(@Body() createUserDto: CreateUserDto) {
		return await this.usersUseCase.create(createUserDto);
	}

	@Put(':id')
	@UseGuards(AuthorizationGuard)
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return await this.usersUseCase.update(id, updateUserDto);
	}

	@Delete(':id')
	@UseGuards(AuthorizationGuard)
	async destroy(@Param('id') id: string) {
		return await this.usersUseCase.destroy(id);
	}
}
