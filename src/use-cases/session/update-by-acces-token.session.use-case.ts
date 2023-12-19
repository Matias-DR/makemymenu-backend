import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import type { SessionGateway } from 'domain/gateways'
import type { SessionModel } from 'domain/models'

export default class SessionUpdateByAccessTokenUseCase {
  constructor (private readonly dbGateway: SessionGateway) { }

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
