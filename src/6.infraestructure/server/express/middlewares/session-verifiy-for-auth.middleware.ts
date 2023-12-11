import type {
  Request,
  Response,
  NextFunction
} from 'express'
import {
  parseToken,
  verifyToken
} from '1.lib/token.lib'

export default async function sessionVerifyForAuthMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  let token: string
  try {
    // Tomo token del header
    token = parseToken(req)
  } catch (error) {
    // Si no hay token (NoTokenGivenException) todo ok
    next()
    return
  }
  try {
    // Si hay token, lo verifico
    verifyToken(token)
  } catch (error: any) {
    // Si el token es inválido devuelvo 'Unhauthorized'
    res.status(error.code).json({ message: error.spanishMessage })
    return
  }
  // Si el token es válido devuelvo 'sesión activa'
  res.status(403).json({ message: 'Sesión activa' })
}
