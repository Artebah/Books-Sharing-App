import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthResponseDto } from "src/common/dtos/auth-response.dto";
import { LoginDto } from "src/common/dtos/login.dto";
import { RegisterDto } from "src/common/dtos/register.dto";
import { User } from "src/user/entities/User.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.userService.findOne({
      email: registerDto.email,
      username: registerDto.username,
    });

    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    const createdUser = await this.userService.create(registerDto);

    const accessToken = this.generateToken(createdUser);

    return new AuthResponseDto({ user: createdUser, accessToken });
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.validateUser(loginDto);
    const accessToken = this.generateToken(user);

    return new AuthResponseDto({ user, accessToken });
  }

  private generateToken(user: User) {
    return this.jwtService.sign({ sub: user.id, name: user.username });
  }
}
