import { SessionModel } from 'domain/models'
import type { SessionRepository } from 'domain/repositories'
import { SessionDBGateway } from 'gateways/databases'

export default class SessionGetByRefreshTokenUseCase {
  private readonly dbGateway: SessionDBGateway

  constructor (private readonly repository: SessionRepository) {
    this.dbGateway = new SessionDBGateway(this.repository)
  }

  async exe (token: string): Promise<SessionModel> {
    SessionModel.test(token)
    const session = await this.dbGateway.getByRefreshToken(token)
    return session
  }
}
