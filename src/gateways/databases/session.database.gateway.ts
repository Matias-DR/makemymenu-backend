import { SessionModel } from 'domain/models'
import type { SessionRepository } from 'domain/repositories'

export default class SessionDBGateway {
  constructor (private readonly repository: SessionRepository) {}

  async create (session: SessionModel): Promise<SessionModel> {
    const result = await this.repository.create(session.toJSON())
    const newSession = new SessionModel(result)
    return newSession
  }

  async getByRefreshToken (token: string): Promise<SessionModel> {
    const result = await this.repository.getByRefreshToken(token)
    const session = new SessionModel(result)
    return session
  }

  async getByAccessToken (token: string): Promise<SessionModel> {
    const result = await this.repository.getByAccessToken(token)
    const session = new SessionModel(result)
    return session
  }

  async existByRefreshToken (token: string): Promise<boolean> {
    return await this.repository.existByRefreshToken(token)
  }

  async existByAccessToken (token: string): Promise<boolean> {
    return await this.repository.existByAccessToken(token)
  }

  async update (session: SessionModel): Promise<SessionModel> {
    const tokens = session.toJSON()
    const result = await this.repository.update(
      tokens.accessToken,
      tokens.refreshToken
    )
    const sessionUpdated = new SessionModel(result)
    return sessionUpdated
  }

  async deleteByRefreshToken (token: string): Promise<SessionModel> {
    const result = await this.repository.deleteByRefreshToken(token)
    const session = new SessionModel(result)
    return session
  }

  async deleteByAccessToken (token: string): Promise<SessionModel> {
    const result = await this.repository.deleteByAccessToken(token)
    const session = new SessionModel(result)
    return session
  }
}
