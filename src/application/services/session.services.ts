import { SessionNotExistException } from 'domain/exceptions/session.exceptions'
import type { SessionRepository } from 'domain/repositories'

export default class SessionServices {
  constructor (private readonly repository: SessionRepository) { }

  async existByRefreshToken (refreshToken: string): Promise<void> {
    const session = await this.repository.getByAccessToken(refreshToken)
    if (session === null || session === undefined) {
      throw new SessionNotExistException()
    }
  }

  async existByAccessToken (accessToken: string): Promise<void> {
    const session = await this.repository.getByAccessToken(accessToken)
    if (session === null || session === undefined) {
      throw new SessionNotExistException()
    }
  }
}
