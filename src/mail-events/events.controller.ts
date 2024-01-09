import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { MailEventDto } from './dto/mail-event.dto'
import { MailEventsService } from './events.service'
import { MailEventReplayDto } from './dto/mail-event-replay.dto'

@Controller('mail')
export class MailEventsController {
  constructor(private readonly mailEventsService: MailEventsService) {}

  @Post('/event')
  @HttpCode(200)
  handleMailEvent(@Body() mailEventDto: MailEventDto): MailEventReplayDto[] {
    return this.mailEventsService.handleMailEvent(mailEventDto)
  }
}
