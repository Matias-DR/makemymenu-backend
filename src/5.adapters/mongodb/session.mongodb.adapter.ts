import type { SessionRepository } from '0.domain/repositories'
import { SessionServices } from '2.services'
import type { SessionAdapter } from '5.adapters'

export default class SessionMongoDBAdapter implements SessionAdapter {
  private readonly services: SessionServices

  constructor (
    private readonly repository: SessionRepository
  ) {
    this.services = new SessionServices(this.repository)
  }

  async updateSession (
    accessToken: string,
    user: {
      id: string
      email: string
    }
  ): Promise<void> {
    // await this.services.createSession(tokens)
  }

  async existByAccessToken (accessToken: string): Promise<boolean> {
    return await this.services.existByAccessToken(accessToken)
  }

  async updateTokens (refreshToken: any): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const result = await this.services.updateTokens(refreshToken)

    const output = {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken
    }

    return output
  }

  async updateAccessToken (data: any): Promise<string> {
    const input = data.refreshToken

    const output = await this.services.updateAccessToken(input)

    return output
  }
}
