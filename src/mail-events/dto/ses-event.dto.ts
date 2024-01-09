import { ValidateNested } from 'class-validator'
import { SESEventMailDto } from './ses-event-mail.dto'
import { SESEventReceiptDto } from './ses-event-receipt.dto'
import { Type } from 'class-transformer'

export class SESEventDto {
  @ValidateNested()
  @Type(() => SESEventReceiptDto)
  receipt!: SESEventReceiptDto

  @ValidateNested()
  @Type(() => SESEventMailDto)
  mail!: SESEventMailDto
}
