import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import { SessionModel } from 'domain/models'
import type { SessionRepository } from 'domain/repositories'
import { SessionDBGateway } from 'gateways/databases'

export default class SessionUpdateUseCase {
  private readonly dbGateway: SessionDBGateway

  constructor (private readonly repository: SessionRepository) {
    this.dbGateway = new SessionDBGateway(this.repository)
  }

  async exe (token: string): Promise<SessionModel> {
    SessionModel.test(token)
    if (!await this.dbGateway.existByRefreshToken(token)) {
      throw new NotFoundOperationException()
    } else {
      const session = await this.dbGateway.getByRefreshToken(token)
      session.update()
      await this.dbGateway.update(session)
      return session
    }
  }
}
