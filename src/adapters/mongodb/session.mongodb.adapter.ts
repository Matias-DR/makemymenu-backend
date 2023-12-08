import type { SessionRepository } from 'domain/repositories'
import { SessionServices } from 'services'
import type { SessionAdapter } from 'adapters'

export default class SessionMongoDBAdapter implements SessionAdapter {
  private readonly services: SessionServices

  constructor (
    private readonly repository: SessionRepository
  ) {
    this.services = new SessionServices(this.repository)
  }

  async existByAccessToken (accessToken: string): Promise<boolean> {
    return await this.services.existByAccessToken(accessToken)
  }

  async updateTokens (data: any): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const input = data.refreshToken

    const result = await this.services.updateTokens(input)

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
