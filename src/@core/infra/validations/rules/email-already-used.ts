import { Injectable } from '@nestjs/common';
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.usecase';

@ValidatorConstraint({ name: 'EmailAlreadyUsedRule' })
@Injectable()
export class EmailAlreadyUsedRule implements ValidatorConstraintInterface {
	constructor(private usersUseCase: UsersUseCase) {}

	async validate(email: string) {
		const user = await this.usersUseCase.findByEmail(email);
		if (user) {
			return false;
		}

		return true;
	}

	defaultMessage() {
		return `Usuário já registrado`;
	}
}
