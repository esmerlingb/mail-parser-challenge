import { IsArray, ValidateNested } from 'class-validator'
import { MailEventRecordDto } from './mail-event-record.dto'
import { Type } from 'class-transformer'

export class MailEventDto {
  @IsArray()
  @ValidateNested()
  @Type(() => MailEventRecordDto)
  Records!: MailEventRecordDto[]
}
