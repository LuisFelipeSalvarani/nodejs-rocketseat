import { faker } from "@faker-js/faker"
import { Injectable } from "@nestjs/common"
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id.js"
import {
  Notification,
  NotificationProps,
} from "../../src/domain/notification/enterprise/entities/notification.js"
import { PrismaNotificationMapper } from "../../src/infra/database/prisma/mappers/prisma-notification-mapper.js"
import { PrismaService } from "../../src/infra/database/prisma/prisma.service.js"

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id
  )

  return notification
}

@Injectable()
export class NotificationFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaNotification(
    data: Partial<NotificationProps> = {}
  ): Promise<Notification> {
    const notification = makeNotification(data)

    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    })

    return notification
  }
}
