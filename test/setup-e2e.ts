import { execSync } from "node:child_process"
import { randomUUID } from "node:crypto"
import { PrismaPg } from "@prisma/adapter-pg"
import { config } from "dotenv"
import { Redis } from "ioredis"
import { PrismaClient } from "../generated/prisma/client.js"
import { DomainEvents } from "../src/core/events/domain-events.js"
import { envSchema } from "../src/infra/env/env.js"

config({ path: ".env", override: true })
config({ path: ".env.test", override: true })

const env = envSchema.parse(process.env)

if (!env.DATABASE_URL) {
  throw new Error("Please provider a DATABASE_URL environment variable.")
}

const schema = new URL(env.DATABASE_URL).searchParams.get("schema") || "public"

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL }, { schema })

const prisma = new PrismaClient({ adapter })
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

function generatedUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error("Please provider a DATABASE_URL environment variable.")
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set("schema", schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generatedUniqueDatabaseURL(schemaId)

  env.DATABASE_URL = databaseURL

  DomainEvents.shouldRun = false

  await redis.flushdb()

  execSync("pnpm prisma migrate deploy")
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
