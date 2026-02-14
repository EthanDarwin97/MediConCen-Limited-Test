import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserMappingController } from "./user-mapping.controller";
import { UserMappingService } from "./user-mapping.service";
import { UserMapping } from "./entities/user-mapping.entity";
@Module({
  imports: [TypeOrmModule.forFeature([UserMapping])],
  controllers: [UserMappingController],
  providers: [UserMappingService],
  exports: [UserMappingService],
})
export class UserMappingModule {}
