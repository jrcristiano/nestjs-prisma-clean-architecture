import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationStrategy } from './authorization.strategy';

describe('AuthorizationStrategy', () => {
	let guard: AuthorizationStrategy;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthorizationStrategy],
		}).compile();

		guard = module.get<AuthorizationStrategy>(AuthorizationStrategy);
	});

	it('should be defined', () => {
		expect(guard).toBeDefined();
	});
});
