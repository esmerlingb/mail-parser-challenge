import { AppError } from '../app-error.js'

export class UnknownError extends AppError {
  constructor(message: string, cause: unknown) {
    super('UnknownError', message, 500, cause)
  }
}
