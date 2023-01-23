import { passwordHash } from "src/@core/infra/utils/password-hash";

type UserProps = {
  name: string;
  lastname: string;
  email: string;
  password?: string;
}

export class User {
  constructor(private props: UserProps) { }

  get name() {
    const name = this.props.name;
    return name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
  }

  get lastname() {
    const lastname = this.props.lastname;
    return lastname.charAt(0).toUpperCase() + lastname.toLowerCase().slice(1);
  }

  get email() {
    return this.props.email.toLocaleLowerCase();
  }

  get password() {
    if (!this.props.password) {
      delete this.props.password;
      return;
    }

    return passwordHash(this.props.password)
  }

  getUser() {
    return {
      ...this.props
    };
  }


}