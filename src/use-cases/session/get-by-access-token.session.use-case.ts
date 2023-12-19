import type { SessionGateway } from 'domain/gateways'
import { SessionModel } from 'domain/models'

export default class SessionGetByAccessTokenUseCase {
  constructor (private readonly dbGateway: SessionGateway) { }

  async exe (token: string): Promise<SessionModel> {
    SessionModel.test(token)
    const session = await this.dbGateway.getByAccessToken(token)
    return session
  }
}
