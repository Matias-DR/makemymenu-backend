import { SessionNotExistException } from '0.domain/exceptions/session.exceptions'
import type { SessionRepository } from '0.domain/repositories'

export default class SessionServices {
  constructor (private readonly repository: SessionRepository) { }

  async existByRefreshToken (token: string): Promise<void> {
    const session = await this.repository.getByAccessToken(token)
    if (session === null || session === undefined) {
      throw new SessionNotExistException()
    }
  }

  async existByAccessToken (token: string): Promise<void> {
    const session = await this.repository.getByAccessToken(token)
    if (session === null || session === undefined) {
      throw new SessionNotExistException()
    }
  }
}
