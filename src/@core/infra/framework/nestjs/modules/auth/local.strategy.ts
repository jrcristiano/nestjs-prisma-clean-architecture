import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUseCase } from 'src/@core/application/use-cases/auth.usecase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authUseCase: AuthUseCase) {
		super({
			usernameField: 'email',
			passwordField: 'password',
		});
	}

	async validate(username: string, password: string): Promise<any> {
		const user = await this.authUseCase.login(username, password);
		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
