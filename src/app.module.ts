import { Module } from '@nestjs/common';
import { UsersModule } from './@core/infra/framework/nestjs/modules/users/users.module';
import { AuthModule } from './@core/infra/framework/nestjs/modules/auth/auth.module';

@Module({
	imports: [UsersModule, AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
