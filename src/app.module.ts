import { Module } from '@nestjs/common';
import { UsersModule } from './@core/infra/framework/nestjs/modules/users.module';

@Module({
	imports: [UsersModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
