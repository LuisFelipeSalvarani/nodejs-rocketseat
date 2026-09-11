import { Injectable } from "@nestjs/common"
import { CacheRepository } from "../cache-repository.js"
import { RedisService } from "./redis.service.js"

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  constructor(private readonly redis: RedisService) {}

  async set(key: string, value: string) {
    await this.redis.set(key, value, "EX", 60 * 15)
  }

  get(key: string) {
    return this.redis.get(key)
  }

  async delete(key: string) {
    await this.redis.del(key)
  }
}
