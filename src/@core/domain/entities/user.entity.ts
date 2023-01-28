type UserProps = {
  name: string;
  lastname: string;
  email: string;
  password?: string;
};

export class User {
  private constructor(private props: UserProps) {}

  static create(props: UserProps) {
    return new User(props);
  }

  get name() {
    const name = this.props.name;
    return name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
  }

  get lastname() {
    const lastname = this.props.lastname;
    return lastname.charAt(0).toUpperCase() + lastname.toLowerCase().slice(1);
  }

  get email() {
    return this.props.email.toLowerCase();
  }

  get password() {
    if (!this.props.password) {
      delete this.props.password;
      return;
    }

    return this.props.password;
  }

  getUser() {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
    } as UserProps;
  }

  getUserJson() {
    return JSON.stringify(this.getUser());
  }
}
