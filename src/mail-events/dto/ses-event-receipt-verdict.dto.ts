import { IsString } from 'class-validator'

export class SESEventReceiptVerdictDto {
  @IsString()
  status!: string
}
