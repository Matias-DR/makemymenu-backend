import { SessionModel } from 'domain/models'
import type { SessionGateway } from 'domain/gateways'

export default class SessionCreateUseCase {
  constructor (private readonly dbGateway: SessionGateway) { }

  async exe (email: string): Promise<SessionModel> {
    const session = SessionModel.createFromEmail(email)
    await this.dbGateway.create(session)
    return session
  }
}
