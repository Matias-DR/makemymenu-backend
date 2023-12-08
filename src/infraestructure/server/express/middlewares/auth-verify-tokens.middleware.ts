import { NoTokenGivenException } from 'domain/exceptions/token.exceptions'
import { SessionMongoDBAdapter } from 'adapters/mongodb'
import { SessionMongoDBRepositoryImplementation } from 'infraestructure/database/mongodb/implementations/repositories'
import type {
  Request,
  Response,
  NextFunction
} from 'express'

export default async function authVerifyTokensMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const header = req.headers.authorization
  if (header === undefined || header === null || header === '') {
    throw new NoTokenGivenException()
  }
  const token = header.split(' ')[1]
  const repository = new SessionMongoDBRepositoryImplementation()
  const adapter = new SessionMongoDBAdapter(repository)
  try {
    await adapter.existByAccessToken(token)
  } catch (error) {
  }
  next()
}
