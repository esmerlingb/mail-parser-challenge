import { IsBoolean, IsDateString, IsString, ValidateNested } from 'class-validator'
import { SESEventMailHeaderDto } from './ses-event-mail-header.dto'
import { Type } from 'class-transformer'
import { SESEventMailCommonHeadersDto } from './ses-event-mail-common-headers.dto'

export class SESEventMailDto {
  @IsDateString()
  timestamp!: string

  @IsString()
  source!: string

  @IsString()
  messageId!: string

  @IsString({ each: true })
  destination!: string[]

  @IsBoolean()
  headersTruncated!: boolean

  @ValidateNested()
  @Type(() => SESEventMailHeaderDto)
  headers!: SESEventMailHeaderDto[]

  @ValidateNested()
  @Type(() => SESEventMailCommonHeadersDto)
  commonHeaders!: SESEventMailCommonHeadersDto
}
