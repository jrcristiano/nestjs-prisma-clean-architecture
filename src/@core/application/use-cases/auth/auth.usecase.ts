import { Injectable } from '@nestjs/common';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.usecase';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { AccessTokenResponseDto } from '../../dto/responses/jwt/access-token-response.dto';
import { UserResponseDto } from '../../dto/responses/users/user.dto';

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

	private async getAccessToken(
		user: UserResponseDto,
	): Promise<AccessTokenResponseDto> {
		return {
			access_token: this.jwtService.sign(user),
			expires_in: env.JWT_EXPIRES_IN,
		};
	}
}
