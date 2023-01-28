import { ValidationOptions, registerDecorator } from 'class-validator';
import { EmailAlreadyUsedRule } from '../rules/email-already-used';

export function EmailAlreadyUsed(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'EmailAlreadyUsed',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: EmailAlreadyUsedRule,
		});
	};
}
