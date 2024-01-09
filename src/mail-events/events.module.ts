import { Module } from '@nestjs/common'
import { MailEventsService } from './events.service'
import { MailEventsController } from './events.controller'

@Module({
  controllers: [MailEventsController],
  providers: [MailEventsService]
})
export class MailEventsModule {}
