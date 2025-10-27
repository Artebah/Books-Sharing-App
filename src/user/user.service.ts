import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { SearchUserDto } from "./dtos/search-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/User.entity";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "src/common/dtos/register.dto";
import { LoginDto } from "src/common/dtos/login.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(searchUserDto: SearchUserDto): Promise<User> {
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

    if (!foundUser) {
      throw new UnauthorizedException("User not found");
    }

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

  async validateUser(loginDto: LoginDto): Promise<User> {
    const foundUser = await this.findOne(loginDto);

    const isPasswordValid = await this.verifyPassword(
      loginDto.password,
      foundUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return foundUser;
  }

  encryptPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  verifyPassword(password: string, storedPassword: string) {
    return bcrypt.compare(password, storedPassword);
  }
}
