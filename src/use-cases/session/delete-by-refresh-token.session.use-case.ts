import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import { SessionModel } from 'domain/models'
import type { SessionRepository } from 'domain/repositories'
import { SessionDBGateway } from 'gateways/databases'

export default class SessionDeleteByRefreshTokenUseCase {
  private readonly dbGateway: SessionDBGateway

  constructor (private readonly repository: SessionRepository) {
    this.dbGateway = new SessionDBGateway(this.repository)
  }

  async exe (token: string): Promise<void> {
    SessionModel.test(token)
    if (!await this.dbGateway.existByRefreshToken(token)) {
      throw new NotFoundOperationException()
    } else {
      await this.dbGateway.deleteByRefreshToken(token)
    }
  }
}
