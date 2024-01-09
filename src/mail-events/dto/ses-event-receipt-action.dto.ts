import { IsString } from 'class-validator'

export class SESEventReceiptActionDto {
  @IsString()
  type!: string

  @IsString()
  topicArn!: string
}
