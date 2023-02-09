import { ExampleObjectValue } from './example.value-object';

describe('ExampleObjectValue', () => {
	it('should be defined', () => {
		const valueObject = new ExampleObjectValue();

		expect(valueObject).toBeDefined();
	});
});
