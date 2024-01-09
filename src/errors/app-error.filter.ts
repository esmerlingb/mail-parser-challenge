import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { Response } from 'express'
import { AppError } from './app-error.js'
import { ErrorHandler } from './error-handler.js'

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
  constructor(private readonly errorHandler: ErrorHandler) {}

  catch(exception: AppError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    this.errorHandler.handleHttpError(exception, response)
  }
}

export const AppErrorFilterProvider = {
  provide: APP_FILTER,
  useClass: AppErrorFilter
}
