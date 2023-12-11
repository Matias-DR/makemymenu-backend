import type { AccessField } from '0.domain/fields/session'
import type { SessionRepository } from '0.domain/repositories'
import {
  createAccessToken,
  createRefreshToken,
  decodeToken
} from '1.lib/token.lib'

export default class SessionUseCases {
  constructor (private readonly repository: SessionRepository) { }

  async createSession (tokens: {
    refreshToken: string
    accessToken: string
  }): Promise<void> {
    await this.repository.createSession(tokens)
  }

  async existByAccessToken (accessToken: AccessField): Promise<boolean> {
    const session = await this.repository.getByAccessToken(accessToken.value)
    return session !== null || session !== undefined
  }

  async updateTokens (refreshToken: string): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const newTokens = {
      refreshToken: '',
      accessToken: ''
    }

    const session = await this.repository.getByRefreshToken(refreshToken)

    if (session !== null && session !== undefined) {
      const decodedData = decodeToken(refreshToken)
      const data = {
        id: decodedData.id,
        email: decodedData.email
      }

      newTokens.refreshToken = createRefreshToken(data)
      newTokens.accessToken = createAccessToken(data)

      await this.repository.updateTokens(
        refreshToken,
        newTokens
      )
    }

    return newTokens
  }

  async updateAccessToken (refreshToken: string): Promise<string> {
    let newAccessToken = ''
    const session = await this.repository.getByRefreshToken(refreshToken)

    if (session !== null && session !== undefined) {
      const decodedData = decodeToken(refreshToken)
      const data = {
        id: decodedData.id,
        email: decodedData.email
      }

      newAccessToken = createAccessToken(data)

      await this.repository.updateAccessToken(
        refreshToken,
        newAccessToken
      )
    }

    return newAccessToken
  }
}
