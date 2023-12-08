import { NoTokenGivenException } from 'domain/exceptions/token.exceptions'
import { AuthVerifyTokenService } from 'application/services/auth'
import type {
  Request,
  Response,
  NextFunction
} from 'express'

export default function authVerifyTokensMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers.authorization
  if (header === undefined || header === null || header === '') {
    throw new NoTokenGivenException()
  }
  const token = header.split(' ')[1]
  new AuthVerifyTokenService(token).execute()
  next()
}
