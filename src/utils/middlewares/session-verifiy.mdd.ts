import { SessionDBGateway } from 'gateways/databases'
import { SessionMongoDBRepositoryInfra } from 'infra/mongoose/repositories'
import { SessionModel } from 'domain/models'
import { ExpiredTokenException, UnhauthorizedException } from 'domain/exceptions/session.exceptions'

const sessionVerifyMdd = async (
  headers: any,
  error: (
    err: any,
    res: any
  ) => void,
  res: any,
  next: () => void,
  sessionNeeded: boolean,
  isForUpdTkn = false
): Promise<void> => {
  try {
    const accessToken = SessionModel.extractTokenFromHeaders(headers)
    // Si el token es inválido levanto error
    SessionModel.test(accessToken)

    const dbGateway = new SessionDBGateway(SessionMongoDBRepositoryInfra)

    if (!isForUpdTkn) {
      if (!await dbGateway.existByAccessToken(accessToken)) {
        // Si no existe la sesión levanto error
        throw new UnhauthorizedException()
      }
    } else {
      if (!await dbGateway.existByRefreshToken(accessToken)) {
        // Si no existe la sesión levanto error
        throw new UnhauthorizedException()
      }
    }
  } catch (err: any) {
    const cond = err instanceof ExpiredTokenException && isForUpdTkn
    if (!(cond)) {
      // Si el token es inválido o no existe la sesión y se requiere sesión
      if (sessionNeeded) {
        error(
          err,
          res
        )
        return
      }
    }
  }
  // Si no se requiere sesión
  next()
}

export default sessionVerifyMdd
