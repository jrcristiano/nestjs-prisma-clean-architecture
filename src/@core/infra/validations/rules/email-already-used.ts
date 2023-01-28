import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { UsersUseCase } from 'src/@core/application/use-cases/users.usecase';

@ValidatorConstraint({ name: 'EmailAlreadyUsedRule' })
@Injectable()
export class EmailAlreadyUsedRule implements ValidatorConstraintInterface {
	constructor(private usersUseCase: UsersUseCase) {}

	async validate(email: string) {
		const user = await this.usersUseCase.findByEmail(email);
		if (user) {
			throw new HttpException('User already registered', HttpStatus.CONFLICT);
		}

		return true;
	}

	defaultMessage() {
		return `Usuário já existe`;
	}
}
