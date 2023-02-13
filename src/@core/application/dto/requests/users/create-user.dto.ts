import {
	IsString,
	MinLength,
	IsEmail,
	IsNotEmpty,
	MaxLength,
} from 'class-validator';
import { EmailAlreadyUsed } from 'src/@core/infra/validations/decorators/email-already-used';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	@MaxLength(255)
	name: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	@MaxLength(255)
	lastname: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(255)
	@IsEmail()
	@EmailAlreadyUsed()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(255)
	password: string;
}
