import { AccessField } from '0.domain/fields/session'
import type {
  Request,
  Response,
  NextFunction
} from 'express'

export default async function sessionVerifyForAuthMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  let token: string
  let access: AccessField
  try {
    // Tomo token del header
    token = AccessField.getTokenFromHeader(req.headers)
    access = AccessField.constructFromToken(token)
  } catch (error) {
    // Si no hay token (NoTokenGivenException) todo ok
    next()
    return
  }
  try {
    // Si hay token, lo verifico
    access.test()
  } catch (error: any) {
    // Si el token es inválido devuelvo 'Unhauthorized'
    res.status(error.code).json({ message: error.spanishMessage })
    return
  }
  // Si el token es válido devuelvo 'sesión activa'
  res.status(403).json({ message: 'Sesión activa' })
}
