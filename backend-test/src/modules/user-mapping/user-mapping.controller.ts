import { Controller, Post, Body } from "@nestjs/common";
import { UserMappingService } from "./user-mapping.service";
import { CreateMappingDto } from "./dto/create-mapping.dto";
import { IUserMappingResponse } from "./interfaces/user-mapping-response.interface";
@Controller("user")
export class UserMappingController {
  constructor(private readonly service: UserMappingService) {}
  @Post("mapping")
  async getMapping(
    @Body() dto: CreateMappingDto,
  ): Promise<IUserMappingResponse> {
    return this.service.findOrCreate(dto.id1, dto.id2);
  }
}
