import type { SessionGateway } from 'domain/gateways'
import { SessionModel } from 'domain/models'
import type { SessionRepository } from 'domain/repositories'

export default class SessionDBGateway implements SessionGateway {
  private readonly repository: SessionRepository

  constructor (Repository: new () => SessionRepository) {
    this.repository = new Repository()
  }

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

  async getByUserId (userId: string): Promise<SessionModel> {
    const result = await this.repository.getByUserId(userId)
    const session = new SessionModel(result)
    return session
  }

  async existByRefreshToken (token: string): Promise<boolean> {
    return await this.repository.existByRefreshToken(token)
  }

  async existByAccessToken (token: string): Promise<boolean> {
    return await this.repository.existByAccessToken(token)
  }

  async existByUserId (userId: string): Promise<boolean> {
    return await this.repository.existByUserId(userId)
  }

  async update (session: SessionModel): Promise<void> {
    const tokens = session.toJSON()
    await this.repository.update(
      tokens.refreshToken,
      tokens.accessToken
    )
  }

  async deleteByRefreshToken (token: string): Promise<void> {
    await this.repository.deleteByRefreshToken(token)
  }

  async deleteByAccessToken (token: string): Promise<void> {
    await this.repository.deleteByAccessToken(token)
  }
}
