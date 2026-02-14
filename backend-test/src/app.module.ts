import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-yet";
import configuration from "./config/configuration";
import { UserMappingModule } from "./modules/user-mapping/user-mapping.module";
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: "mysql",
        host: config.get<string>("database.host"),
        port: config.get<number>("database.port"),
        username: config.get<string>("database.username"),
        password: config.get<string>("database.password"),
        database: config.get<string>("database.name"),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        store: await redisStore.redisStore({
          url: `redis://${config.get("redis.host")}:${config.get("redis.port")}`,
        }),
      }),
      inject: [ConfigService],
    }),
    UserMappingModule,
  ],
})
export class AppModule {}
