import type { SessionGateway } from 'domain/gateways'
import { SessionModel } from 'domain/models'

export default class SessionGetByRefreshTokenUseCase {
  constructor (private readonly dbGateway: SessionGateway) { }

  async exe (token: string): Promise<SessionModel> {
    SessionModel.test(token)
    const session = await this.dbGateway.getByRefreshToken(token)
    return session
  }
}
