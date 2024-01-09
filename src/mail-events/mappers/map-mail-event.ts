import { extractUsernameFromEmail } from '../../utils/extract-username-from-email'
import { MailEventRecordDto } from '../dto/mail-event-record.dto'
import { MailEventReplayDto } from '../dto/mail-event-replay.dto'
import { MailEventDto } from '../dto/mail-event.dto'
import { SESEventReceiptVerdictDto } from '../dto/ses-event-receipt-verdict.dto'

export const mapMailEvent = (mailEventDto: MailEventDto): MailEventReplayDto[] => {
  return mailEventDto.Records.map((record) => mapMailEventRecord(record))
}

export const mapMailEventRecord = ({ ses }: MailEventRecordDto): MailEventReplayDto => {
  const dns =
    parseVerdict(ses.receipt.spfVerdict) &&
    parseVerdict(ses.receipt.dkimVerdict) &&
    parseVerdict(ses.receipt.dmarcVerdict)

  const mes = new Date(ses.mail.timestamp).toLocaleString('default', { month: 'long' }).toLocaleLowerCase()

  return {
    spam: parseVerdict(ses.receipt.spamVerdict),
    virus: parseVerdict(ses.receipt.virusVerdict),
    dns,
    mes,
    retrasado: ses.receipt.processingTimeMillis > 1000,
    emisor: extractUsernameFromEmail(ses.mail.source),
    receptor: ses.mail.destination.map(extractUsernameFromEmail)
  }
}

const parseVerdict = (verdictDto: SESEventReceiptVerdictDto): boolean => {
  return verdictDto.status.toLocaleLowerCase() === 'pass'
}
