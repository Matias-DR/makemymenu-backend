import { Exception } from 'domain/exceptions/exception'

export default function errorMddImpl (
  err: any,
  res: any
): void {
  if (err instanceof Exception) {
    res.status(err.code).json(err.spanishMessage)
  } else {
    res.status(500).json()
  }
}
