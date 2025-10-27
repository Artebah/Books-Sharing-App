import { BadRequestException, Injectable } from "@nestjs/common";
import { SearchUserDto } from "./dtos/search-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/User.entity";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "src/common/dtos/register.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(searchUserDto: SearchUserDto) {
    if (!searchUserDto.email && !searchUserDto.username) {
      throw new BadRequestException(
        "At least one search criterion (username or email) must be provided.",
      );
    }

    const conditions: { [key: string]: string }[] = [];

    if (searchUserDto.email) {
      conditions.push({ email: searchUserDto.email });
    }

    if (searchUserDto.username) {
      conditions.push({ username: searchUserDto.username });
    }

    const foundUser = await this.usersRepository.findOne({
      where: conditions,
    });

    return foundUser;
  }

  async create(createUserDto: RegisterDto) {
    const encryptedPassword = await this.encryptPassword(
      createUserDto.password,
    );

    const newUser: User = await this.usersRepository.save({
      ...createUserDto,
      password: encryptedPassword,
    });

    return newUser;
  }

  private encryptPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
