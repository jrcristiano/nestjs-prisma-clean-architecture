import { Injectable } from '@nestjs/common';
import { UsersUseCase } from 'src/@core/application/use-cases/users.usecase';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUseCase {
	constructor(
		private readonly usersUseCase: UsersUseCase,
		private readonly jwtService: JwtService,
	) {}

	async login(email: string, password: string) {
		const user = await this.usersUseCase.findByEmail(email);
		if (!user) {
			return null;
		}

		const validatedPassword = await compare(password, user.password);
		if (!validatedPassword) {
			return null;
		}

		delete user.password;
		return this.getAccessToken(user);
	}

	async getAccessToken(payloadAuthUser: any) {
		return {
			access_token: this.jwtService.sign(payloadAuthUser),
		};
	}
}
