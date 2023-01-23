import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersModule } from './@core/infra/frameworks/nestjs/ioc/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [PrismaClient],
})
export class AppModule { }
