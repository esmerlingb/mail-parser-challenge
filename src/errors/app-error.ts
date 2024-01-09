export class AppError extends Error {
  public readonly name: string
  public readonly statusCode: number
  public readonly message: string

  constructor(name: string, message: string, statusCode: number, cause?: unknown) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain

    this.name = name
    this.statusCode = statusCode
    this.message = message
    this.cause = cause

    Error.captureStackTrace(this)
  }
}
