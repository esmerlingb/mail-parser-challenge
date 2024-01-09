import {
  Controller,
  FileTypeValidator,
  Header,
  HttpCode,
  ParseFilePipe,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MailParserService } from './mail-parser.service'
import { BadRequestError } from '../errors/utils/bad-request.error'

@Controller('mail')
export class MailParserController {
  constructor(private readonly mailParserService: MailParserService) {}

  @Post('parse')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseInterceptors(FileInterceptor('mail'))
  async parseMail(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'message/rfc822' })]
      })
    )
    mail: Express.Multer.File
  ): Promise<StreamableFile | null> {
    if (!mail) {
      throw new BadRequestError('Mail file is mandatory')
    }

    return await this.mailParserService.getJSONFromMail(mail.buffer)
  }
}
