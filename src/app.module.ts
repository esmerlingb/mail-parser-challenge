import { Module } from '@nestjs/common'
import { MailEventsModule } from './mail-events/events.module'
import { MailParserModule } from './mail-parser/mail-parser.module'
import { AppErrorModule } from './errors/app-error.module'

@Module({
  imports: [MailEventsModule, MailParserModule, AppErrorModule]
})
export class AppModule {}
