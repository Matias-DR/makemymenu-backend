import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import { SessionModel } from 'domain/models'
import type { SessionGateway } from 'domain/gateways'

export default class SessionDeleteByRefreshTokenUseCase {
  constructor (private readonly dbGateway: SessionGateway) { }

  async exe (token: string): Promise<void> {
    SessionModel.test(token)
    if (!await this.dbGateway.existByRefreshToken(token)) {
      throw new NotFoundOperationException()
    } else {
      await this.dbGateway.deleteByRefreshToken(token)
    }
  }
}
