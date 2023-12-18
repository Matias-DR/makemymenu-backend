import { Exception } from 'domain/exceptions/exception'

const errorMddInfra = (
  err: any,
  res: any
): void => {
  if (err instanceof Exception) {
    res.status(err.code).json(err.spanishMessage)
  } else {
    res.status(500).json()
  }
}

export default errorMddInfra
