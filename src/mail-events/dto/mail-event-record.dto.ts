import { IsString, ValidateNested } from 'class-validator'
import { SESEventDto } from './ses-event.dto'
import { Type } from 'class-transformer'

export class MailEventRecordDto {
  @IsString()
  eventVersion!: string

  @ValidateNested()
  @Type(() => SESEventDto)
  ses!: SESEventDto

  @IsString()
  eventSource!: string
}
