import { SessionDBGateway } from 'gateways/databases'
import { SessionMongoDBRepositoryImpl } from 'impl/mongoose/repositories'
import { SessionModel } from 'domain/models'
import { UnhauthorizedException } from 'domain/exceptions/session.exceptions'

const sessionVerifyMdd = async (
  headers: any,
  error: (
    err: any,
    res: any
  ) => void,
  res: any,
  next: () => void,
  sessionNeeded: boolean
): Promise<void> => {
  try {
    const accessToken = SessionModel.extractTokenFromHeaders(headers)
    // Si el token es inválido levanto error
    SessionModel.test(accessToken)

    const repository = new SessionMongoDBRepositoryImpl()
    const dbGateway = new SessionDBGateway(repository)

    if (!await dbGateway.existByAccessToken(accessToken)) {
      // Si no existe la sesión levanto error
      throw new UnhauthorizedException()
    }
  } catch (err: any) {
    // Si el token es inválido o no existe la sesión y se requiere sesión
    if (sessionNeeded) {
      error(
        err,
        res
      )
      return
    }
  }
  // Si no se requiere sesión
  next()
}

export default sessionVerifyMdd
