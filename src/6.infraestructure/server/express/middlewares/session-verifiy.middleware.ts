import { AccessField } from '0.domain/fields/session'
import { Exception } from '0.domain/exceptions/exception'
import { SessionUseCases } from '3.use-cases'
import { SessionMongoDBRepositoryImplementation } from '6.infraestructure/database/mongodb/implementations/repositories'
import type {
  Request,
  Response,
  NextFunction
} from 'express'

export default async function sessionVerifyMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tokenFromHeader = AccessField.getTokenFromHeader(req.header)
    const accessToken = AccessField.constructFromToken(tokenFromHeader)
    accessToken.test()

    const repository = new SessionMongoDBRepositoryImplementation()
    const useCase = new SessionUseCases(repository)
    await useCase.existByAccessToken(accessToken)
  } catch (error: any) {
    if (error instanceof Exception) {
      res.status(error.code).json({ message: error.spanishMessage })
    } else {
      res.status(500).json()
    }
  }
  next()
}
