import { NotFoundOperationException } from 'domain/exceptions/operation.exceptions'
import type { SessionGateway } from 'domain/gateways'
import type {
  SessionModel,
  UserModel
} from 'domain/models'

export default class SessionUpdateAfterUserUpdateUseCase {
  constructor (private readonly dbGateway: SessionGateway) { }

  async exe (
    token: string,
    user: UserModel
  ): Promise<SessionModel> {
    if (!await this.dbGateway.existByAccessToken(token)) {
      throw new NotFoundOperationException()
    } else {
      const session = await this.dbGateway.getByAccessToken(token)
      session.update(user.email)
      await this.dbGateway.update(session)
      return session
    }
  }
}
