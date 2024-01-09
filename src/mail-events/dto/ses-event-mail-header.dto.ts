import { IsString } from 'class-validator'

export class SESEventMailHeaderDto {
  @IsString()
  name!: string

  @IsString()
  value!: string
}
