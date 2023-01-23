import { HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "src/@core/application/dto/requests/create-user.dto";
import { UpdateUserDto } from "src/@core/application/dto/requests/update-user.dto";
import { User } from "src/@core/domain/entities/user.entity";
import { PrismaService } from 'src/@core/infra/frameworks/nestjs/database/prisma/prisma.service';

const columns = {
  id: true,
  name: true,
  lastname: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getAll() {
    return this.prisma.user.findMany({
      select: columns
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      select: columns,
      where: {
        id
      }
    });

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const user = new User(data).getUser() as CreateUserDto;
    return await this.prisma.user.create({
      data: user
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const user = new User(data).getUser() as UpdateUserDto;
    return await this.prisma.user.update({
      where: {
        id
      },
      data: user
    });
  }

  async destroy(id: string) {
    return this.prisma.user.delete({
      where: {
        id
      }
    });
  }
}
