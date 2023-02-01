import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserLoginDto } from 'src/@core/application/dto/requests/auth/user-login.dto';
import { AuthUseCase } from 'src/@core/application/use-cases/auth.usecase';
import { AuthenticationGuard } from 'src/@core/infra/framework/nestjs/modules/auth/authentication.guard';
import { AuthorizationGuard } from 'src/@core/infra/framework/nestjs/modules/auth/authorization.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authUseCase: AuthUseCase) {}

	@UseGuards(AuthenticationGuard)
	@Post('login')
	async login(@Body() body: UserLoginDto) {
		return this.authUseCase.login(body.email, body.password);
	}

	@UseGuards(AuthorizationGuard)
	@Get('user')
	async getAuthUser(@Req() req: Request) {
		return req.user;
	}
}