import type { SessionRepository } from 'domain/repositories'
import {
  createAccessToken,
  createRefreshToken,
  decodeToken
} from 'lib/token.lib'

export default class SessionServices {
  constructor (private readonly repository: SessionRepository) { }

  async existByAccessToken (accessToken: string): Promise<boolean> {
    const session = await this.repository.getByAccessToken(accessToken)
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
