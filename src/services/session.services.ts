import type { SessionRepository } from 'domain/repositories'
import {
  createAccessToken,
  createRefreshToken,
  decodeToken
} from 'lib/token.lib'

export default class SessionServices {
  constructor (private readonly repository: SessionRepository) { }

  async updateTokens (refreshToken: string): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const newTokens = {
      refreshToken: '',
      accessToken: ''
    }

    if (await this.repository.existByRefresh(refreshToken)) {
      const decodedData = decodeToken(refreshToken)
      const data = {
        email: decodedData.email,
        id: decodedData.id
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
    if (await this.repository.existByRefresh(refreshToken)) {
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
