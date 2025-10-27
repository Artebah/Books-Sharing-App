import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/.*[A-Z].*/, {
    message: "Password must contain at least 1 uppercase letter",
  })
  @Matches(/.*\d.*/, {
    message: "Password must contain at least 1 number",
  })
  @Matches(/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/, {
    message: "Password must contain at least 1 special character",
  })
  password: string;

  @IsEmail()
  email: string;
}
