import { extractTokenFromHeaders, verifyToken } from 'utils/token.util'
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
  let access: string
  try {
    // Tomo token del header
    access = extractTokenFromHeaders(req.headers)
  } catch (error) {
    // Si no hay token (NoTokenGivenException) todo ok
    next()
    return
  }
  try {
    // Si hay token, lo verifico
    verifyToken(access)
  } catch (error: any) {
    // Si el token es inválido devuelvo 'Unhauthorized'
    res.status(error.code).json(error.spanishMessage)
    return
  }
  // Si el token es válido devuelvo 'sesión activa'
  res.status(403).json('Acceso denegado')
}
