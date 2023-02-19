import { passwordHash } from 'src/@core/domain/value-objects/password-hash/password-hash.value-object';
import { hash } from 'src/@core/infra/utils/uuid.util';

type UserProps = {
	id?: string;
	name: string;
	lastname: string;
	email: string;
	password?: string;
};

export class User {
	private readonly props: UserProps;

	private constructor(props: UserProps) {
		this.props = props;
	}

	static create(props: UserProps) {
		return new User(props);
	}

	get id() {
		if (!this.props.id) {
			return hash();
		}

		return this.props.id;
	}

	get name() {
		return (
			this.props.name.charAt(0).toUpperCase() +
			this.props.name.toLowerCase().slice(1)
		);
	}

	get lastname() {
		return (
			this.props.lastname.charAt(0).toUpperCase() +
			this.props.lastname.toLowerCase().slice(1)
		);
	}

	get email() {
		return this.props.email.toLowerCase();
	}

	get password() {
		return this.props.password ? passwordHash(this.props.password) : undefined;
	}

	getUser() {
		return {
			id: this.id,
			name: this.name,
			lastname: this.lastname,
			email: this.email,
			password: this.password,
		} as User;
	}

	getUserJson() {
		return JSON.stringify(this.getUser());
	}
}
