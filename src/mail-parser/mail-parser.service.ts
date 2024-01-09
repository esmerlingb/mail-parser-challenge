import { Injectable, StreamableFile } from '@nestjs/common'
import { ParsedMail, simpleParser } from 'mailparser'
import { Stream } from 'stream'
import { UnknownError } from '../errors/utils/unknown.error'
import { JSONExtractor } from './entities/json-extractor'

@Injectable()
export class MailParserService {
  constructor() {}

  async getJSONFromMail(mail: Buffer | Stream): Promise<StreamableFile | null> {
    const parsedMail = await this.parseMail(mail)

    const jsonAttachment = parsedMail.attachments.find((attachment) => attachment.contentType === 'application/json')
    if (jsonAttachment) {
      return new StreamableFile(jsonAttachment.content)
    }

    if (!parsedMail.html) return null

    return this.getJSONFromHtml(parsedMail.html)
  }

  private async getJSONFromHtml(html: string): Promise<StreamableFile | null> {
    try {
      const jsonExtractor = new JSONExtractor()
      const json = await jsonExtractor.getJSONFromHtml(html)
      if (!json) return null

      return new StreamableFile(json)
    } catch (error) {
      throw new UnknownError('An error occurred while trying to get JSON file', error)
    }
  }

  private async parseMail(mail: Buffer | Stream): Promise<ParsedMail> {
    try {
      return await simpleParser(mail)
    } catch (error) {
      throw new UnknownError('An error occurred while trying to parse mail', error)
    }
  }
}
