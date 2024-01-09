import { Module } from '@nestjs/common'
import { MailParserController } from './mail-parser.controller'
import { MailParserService } from './mail-parser.service'

@Module({
  controllers: [MailParserController],
  providers: [MailParserService]
})
export class MailParserModule {}
