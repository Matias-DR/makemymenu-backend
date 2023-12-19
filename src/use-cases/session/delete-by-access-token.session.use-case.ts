import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import type { SessionGateway } from 'domain/gateways'

export default class SessionDeleteByAccessTokenUseCase {
  constructor (private readonly dbGateway: SessionGateway) { }

  async exe (token: string): Promise<void> {
    if (!await this.dbGateway.existByAccessToken(token)) {
      throw new NotFoundOperationException()
    } else {
      await this.dbGateway.deleteByAccessToken(token)
    }
  }
}
