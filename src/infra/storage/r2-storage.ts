import { randomUUID } from "node:crypto"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { Injectable } from "@nestjs/common"
import {
  Uploader,
  UploadParams,
} from "../../domain/forum/application/storage/uploader.js"
import { EnvService } from "../env/env.service.js"

@Injectable()
export class R2Storage implements Uploader {
  private readonly client: S3Client

  constructor(private readonly envService: EnvService) {
    const accountId = envService.get("CLOUDFLARE_ACCOUNT_ID")
    const accessKeyId = envService.get("AWS_ACCESS_KEY_ID")
    const secretAccessKey = envService.get("AWS_SECRET_ACCESS_KEY")

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }

  async upload({ fileName, fileType, body }: UploadParams) {
    const uploadId = randomUUID()
    const uniqueFileName = `${uploadId}-${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get("AWS_BUCKET_NAME"),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      })
    )

    return {
      url: uniqueFileName,
    }
  }
}
