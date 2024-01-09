import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import appConfig from './config/app.config'
import { AppErrorModule } from './errors/app-error.module'
import { MailEventsModule } from './mail-events/events.module'
import { MailParserModule } from './mail-parser/mail-parser.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig]
    }),
    MailEventsModule,
    MailParserModule,
    AppErrorModule
  ]
})
export class AppModule {}
