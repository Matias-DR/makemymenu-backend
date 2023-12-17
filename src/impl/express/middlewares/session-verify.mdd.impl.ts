import { errorMddImpl } from './'
import { sessionVerifyMdd } from 'utils/middlewares'

import type {
  NextFunction,
  Request,
  Response
} from 'express'

export default async function verifySessionMdd (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  await sessionVerifyMdd(
    req.headers,
    errorMddImpl,
    res,
    next,
    true
  )
}
