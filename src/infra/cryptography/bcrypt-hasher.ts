import { compare, hash } from "bcryptjs"
import { HashComparer } from "../../domain/forum/application/cryptography/hash-comparer.js"
import { HashGenerator } from "../../domain/forum/application/cryptography/hash-generator.js"

export class BcryptHasher implements HashGenerator, HashComparer {
  private readonly HASH_SALT_LENGTH = 8

  hash(plain: string) {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string) {
    return compare(plain, hash)
  }
}
