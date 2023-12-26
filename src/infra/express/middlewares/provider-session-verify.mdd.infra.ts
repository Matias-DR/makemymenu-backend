import { errorMddInfra } from '.'
import { providerSessionVerifyMdd } from 'utils/middlewares'

import type {
  NextFunction,
  Request,
  Response
} from 'express'

const verifyProviderSessionMdd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await providerSessionVerifyMdd(
    req.headers,
    errorMddInfra,
    res,
    next
  )
}

export default verifyProviderSessionMdd
