import { IsString } from 'class-validator'

export class SESEventMailCommonHeadersDto {
  @IsString()
  returnPath!: string

  @IsString({ each: true })
  from!: string[]

  @IsString()
  date!: string

  @IsString({ each: true })
  to!: string[]

  @IsString()
  messageId!: string

  @IsString()
  subject!: string
}
