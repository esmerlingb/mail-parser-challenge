import { Injectable } from '@nestjs/common'
import { MailEventDto } from './dto/mail-event.dto'
import { MailEventReplayDto } from './dto/mail-event-replay.dto'
import { mapMailEvent } from './mappers/map-mail-event'

@Injectable()
export class MailEventsService {
  handleMailEvent(mailEventDto: MailEventDto): MailEventReplayDto[] {
    return mapMailEvent(mailEventDto)
  }
}
