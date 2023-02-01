import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class UserLoginDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(255)
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(255)
	password: string;
}
