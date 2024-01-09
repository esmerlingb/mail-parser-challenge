import { IsDateString, IsNumber, IsString, ValidateNested } from 'class-validator'
import { SESEventReceiptActionDto } from './ses-event-receipt-action.dto'
import { SESEventReceiptVerdictDto } from './ses-event-receipt-verdict.dto'
import { Type } from 'class-transformer'

export class SESEventReceiptDto {
  @IsDateString()
  timestamp!: string

  @IsNumber()
  processingTimeMillis!: number

  @IsString({ each: true })
  recipients!: string[]

  @ValidateNested()
  @Type(() => SESEventReceiptVerdictDto)
  spamVerdict!: SESEventReceiptVerdictDto
  virusVerdict!: SESEventReceiptVerdictDto

  @ValidateNested()
  @Type(() => SESEventReceiptVerdictDto)
  spfVerdict!: SESEventReceiptVerdictDto

  @ValidateNested()
  @Type(() => SESEventReceiptVerdictDto)
  dkimVerdict!: SESEventReceiptVerdictDto

  @ValidateNested()
  @Type(() => SESEventReceiptVerdictDto)
  dmarcVerdict!: SESEventReceiptVerdictDto

  @IsString()
  dmarcPolicy!: string

  @ValidateNested()
  @Type(() => SESEventReceiptActionDto)
  action!: SESEventReceiptActionDto
}
