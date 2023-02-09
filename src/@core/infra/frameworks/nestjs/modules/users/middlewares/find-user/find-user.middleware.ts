import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { UsersUseCase } from 'src/@core/application/use-cases/users/users.use-case';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class FindUserMiddleware implements NestMiddleware {
	constructor(private usersUseCase: UsersUseCase) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const user = await this.usersUseCase.findById(req.params.id);

		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		next();
	}
}
