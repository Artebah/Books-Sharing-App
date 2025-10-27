import { registerAs } from "@nestjs/config";
import { AuthConfig } from "./app.config";

export const authConfig = registerAs(
  "auth",
  (): AuthConfig => ({
    expiresIn: process.env.EXPIRES_IN,
    secret: process.env.SECRET,
  }),
);
