import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import { SessionModel } from 'domain/models'
import type { SessionRepository } from 'domain/repositories'
import { SessionDBGateway } from 'gateways/databases'

export default class SessionDeleteByAccessTokenUseCase {
  private readonly dbGateway: SessionDBGateway

  constructor (private readonly repository: SessionRepository) {
    this.dbGateway = new SessionDBGateway(this.repository)
  }

  async exe (token: string): Promise<void> {
    SessionModel.test(token)
    if (!await this.dbGateway.existByAccessToken(token)) {
      throw new NotFoundOperationException()
    } else {
      await this.dbGateway.deleteByAccessToken(token)
    }
  }
}