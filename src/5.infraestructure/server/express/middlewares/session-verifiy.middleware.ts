import { Exception } from '0.domain/exceptions/exception'
import { extractTokenFromHeaders, verifyToken } from '1.utils/token.util'
import { SessionServices } from '2.services'
import { SessionMongoDBRepositoryImplementation } from '5.infraestructure/database/mongodb/repositories'
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
    const accessToken = extractTokenFromHeaders(req.headers)
    verifyToken(accessToken)

    const repository = new SessionMongoDBRepositoryImplementation()
    const services = new SessionServices(repository)

    await services.existByAccessToken(accessToken)
  } catch (error: any) {
    if (error instanceof Exception) {
      res.status(error.code).json({ message: error.spanishMessage })
    } else {
      res.status(500).json()
    }
    return
  }
  next()
}
