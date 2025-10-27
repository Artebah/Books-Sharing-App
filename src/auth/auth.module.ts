import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthConfig, GlobalTypedConfig } from "src/config/app.config";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: GlobalTypedConfig) => ({
        secret: config.get<AuthConfig>("auth")?.secret,
        signOptions: {
          expiresIn: config.get<AuthConfig>("auth")?.expiresIn as `${number}`,
        },
      }),
    }),
  ],
})
export class AuthModule {}
