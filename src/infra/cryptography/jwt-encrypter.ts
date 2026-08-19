import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Encrypter } from "../../domain/forum/application/cryptography/encrypter.js"

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private readonly jwtService: JwtService) {}

  encrypt(payload: Record<string, unknown>) {
    return this.jwtService.signAsync(payload)
  }
}
