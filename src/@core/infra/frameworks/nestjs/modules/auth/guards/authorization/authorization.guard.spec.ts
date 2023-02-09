import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationGuard } from './authorization.guard';

describe('AuthorizationGuard', () => {
	let guard: AuthorizationGuard;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthorizationGuard],
		}).compile();

		guard = module.get<AuthorizationGuard>(AuthorizationGuard);
	});

	it('should be defined', () => {
		expect(guard).toBeDefined();
	});
});
