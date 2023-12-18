import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import type { SessionModel } from 'domain/models'
import type { SessionRepository } from 'domain/repositories'
import { SessionDBGateway } from 'gateways/databases'

export default class SessionUpdateByAccessTokenUseCase {
  private readonly dbGateway: SessionDBGateway

  constructor (private readonly repository: SessionRepository) {
    this.dbGateway = new SessionDBGateway(this.repository)
  }

  async exe (token: string): Promise<SessionModel> {
    if (!await this.dbGateway.existByAccessToken(token)) {
      throw new NotFoundOperationException()
    } else {
      const session = await this.dbGateway.getByAccessToken(token)
      session.update()
      await this.dbGateway.update(session)
      return session
    }
  }
}
