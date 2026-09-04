import { randomUUID } from "node:crypto"
import {
  Uploader,
  UploadParams,
} from "../../src/domain/forum/application/storage/uploader.js"

interface Upload {
  fileName: string
  url: string
}

export class FakeUploader implements Uploader {
  uploads: Upload[] = []

  async upload({ fileName }: UploadParams) {
    const url = randomUUID()

    this.uploads.push({
      fileName,
      url,
    })

    return { url }
  }
}
