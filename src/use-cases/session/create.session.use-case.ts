import { SessionModel } from 'domain/models'
import type { SessionRepository } from 'domain/repositories'
import { SessionDBGateway } from 'gateways/databases'

export default class SessionCreateUseCase {
  private readonly dbGateway: SessionDBGateway

  constructor (private readonly repository: SessionRepository) {
    this.dbGateway = new SessionDBGateway(this.repository)
  }

  async exe (email: string): Promise<SessionModel> {
    const session = SessionModel.createFromEmail(email)
    await this.dbGateway.create(session)
    return session
  }
}
