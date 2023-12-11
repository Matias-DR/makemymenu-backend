export class Exception extends Error {
  readonly code: number
  readonly spanishMessage: string

  constructor (
    message: string,
    code: number,
    spanishMessage: string
  ) {
    super(message)
    this.code = code
    this.spanishMessage = spanishMessage
  }
}
