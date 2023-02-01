import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserLoginDto } from 'src/@core/application/dto/requests/auth/user-login.dto';
import { AuthUseCase } from 'src/@core/application/use-cases/auth.usecase';
import { AuthenticationGuard } from 'src/@core/infra/framework/nestjs/modules/auth/authentication.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authUseCase: AuthUseCase) {}

	@UseGuards(AuthenticationGuard)
	@Post('login')
	async login(@Body() body: UserLoginDto) {
		return this.authUseCase.login(body.email, body.password);
	}
}
