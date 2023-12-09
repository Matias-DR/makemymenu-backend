import type {
  Request,
  Response,
  NextFunction
} from 'express'

export default async function sessionVerifyForAuthPagesMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const header = req.headers.authorization
  if (!(header === undefined || header === null || header === '')) {
    res.status(403).json({ message: 'Sesión activa' })
  } else {
    next()
  }
}
