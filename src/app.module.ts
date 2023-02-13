import { Module } from '@nestjs/common';
import { UsersModule } from './@core/infra/frameworks/nestjs/modules/users/users.module';
import { AuthModule } from './@core/infra/frameworks/nestjs/modules/auth/auth.module';
@Module({
	imports: [UsersModule, AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
