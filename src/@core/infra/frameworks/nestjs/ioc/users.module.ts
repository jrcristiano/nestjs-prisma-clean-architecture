import { Module } from '@nestjs/common';
import { UsersUseCase } from 'src/@core/application/use-cases/users.usecase';
import { User as UserEntity } from 'src/@core/domain/entities/user.entity';
import { UsersController } from 'src/@core/presentation/controllers/users.controller';
import { PrismaService } from '../database/prisma/prisma.service';
import { UserRepository } from '../repositories/user.repository';


@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UserRepository,
    {
      provide: UsersUseCase,
      useFactory: () => new UsersUseCase(new UserRepository(new PrismaService)),
      inject: [UserRepository],
    },
  ],
})
export class UsersModule { }
