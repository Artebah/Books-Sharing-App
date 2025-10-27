import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as Joi from "joi";

export const globalConfigValidationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  EXPIRES_IN: Joi.string().required(),
  SECRET: Joi.string().required(),
});

export interface AuthConfig {
  expiresIn?: string;
  secret?: string;
}
export interface ConfigType {
  typeorm: TypeOrmModuleOptions;
  auth: AuthConfig;
}

export class GlobalTypedConfig extends ConfigService<ConfigType> {}
