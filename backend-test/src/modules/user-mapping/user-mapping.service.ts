import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { UserMapping } from "./entities/user-mapping.entity";
import { IUserMappingResponse } from "./interfaces/user-mapping-response.interface";
@Injectable()
export class UserMappingService {
  constructor(
    @InjectRepository(UserMapping)
    private readonly repo: Repository<UserMapping>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async findOrCreate(id1: string, id2: string): Promise<IUserMappingResponse> {
    const cacheKey = `user:${id1}:${id2}`;
    const cached = await this.cacheManager.get<string>(cacheKey);
    if (cached) {
      return { userID: cached };
    }
    let record = await this.repo.findOne({ where: { id1, id2 } });
    if (!record) {
      const userID = uuidv4();
      try {
        record = await this.repo.save({ id1, id2, userID });
      } catch (e) {
        record = await this.repo.findOne({ where: { id1, id2 } });
      }
    }
    await this.cacheManager.set(cacheKey, record.userID, 3600);
    return { userID: record.userID };
  }
}
