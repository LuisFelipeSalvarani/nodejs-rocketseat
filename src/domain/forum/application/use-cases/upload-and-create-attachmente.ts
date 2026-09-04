import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either.js"
import { Attachment } from "../../enterprise/entities/attachment.js"
import { AttachmentsRepository } from "../repositories/attachments-repository.js"
import { Uploader } from "../storage/uploader.js"
import { InvalidAttachmentTypeError } from "./errors/invalid-attachment-type.js"

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>

const regex = /^(image\/(jpeg|png))$|^application\/pdf$/

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private readonly attachmentRepository: AttachmentsRepository,
    private readonly uploader: Uploader
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    if (!regex.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentRepository.create(attachment)

    return right({ attachment })
  }
}
