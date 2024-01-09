import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { AppError } from './app-error.js'

@Injectable()
export class ErrorHandler {
  constructor(private readonly configService: ConfigService) {}

  handleHttpError(error: AppError, res: Response): void {
    // eslint-disable-next-line no-console
    console.error(error)
    const status = error.statusCode
    const isProduction = this.configService.get<boolean>('isProduction') as boolean
    const extendedError = isProduction ? {} : { extendedError: error }

    res.status(status).json({
      statusCode: status,
      error: error.name,
      message: error.message,
      ...extendedError
    })
  }
}
