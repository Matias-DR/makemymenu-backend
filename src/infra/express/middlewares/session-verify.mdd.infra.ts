import { errorMddInfra } from '.'
import { sessionVerifyMdd } from 'utils/middlewares'

import type {
  NextFunction,
  Request,
  Response
} from 'express'

const verifySessionMdd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await sessionVerifyMdd(
    req.headers,
    errorMddInfra,
    res,
    next,
    true
  )
}

export default verifySessionMdd
