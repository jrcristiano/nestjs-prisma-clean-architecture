import { UserRepository } from 'src/@core/infra/frameworks/nestjs/repositories/user.repository';
import { CreateUserDto } from '../dto/requests/create-user.dto';
import { UpdateUserDto } from '../dto/requests/update-user.dto';

export class UsersUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async destroy(id: string) {
    return await this.userRepository.destroy(id);
  }
}
