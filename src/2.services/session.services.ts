import { SessionNotExistException } from '0.domain/exceptions/session.exceptions'
import type {
  RefreshField,
  AccessField
} from '0.domain/fields/session'
import type { SessionRepository } from '0.domain/repositories'

export default class SessionServices {
  constructor (private readonly repository: SessionRepository) { }

  async existByRefreshToken (refreshToken: RefreshField): Promise<void> {
    const session = await this.repository.getByAccessToken(refreshToken.value)
    if (session !== null || session !== undefined) {
      throw new SessionNotExistException()
    }
  }

  async existByAccessToken (accessToken: AccessField): Promise<void> {
    const session = await this.repository.getByAccessToken(accessToken.value)
    if (session !== null || session !== undefined) {
      throw new SessionNotExistException()
    }
  }
}
