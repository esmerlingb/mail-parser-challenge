import { AppError } from '../app-error.js'

export class BadRequestError extends AppError {
  constructor(message: string, cause?: unknown) {
    super('BadRequest', message, 400, cause)
  }
}
