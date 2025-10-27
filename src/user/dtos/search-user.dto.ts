import { IsString, IsEmail, IsOptional } from "class-validator";

export class SearchUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
