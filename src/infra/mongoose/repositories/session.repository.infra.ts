import type { SessionEntity } from 'domain/entities'
import type { SessionRepository } from 'domain/repositories'
import { SessionModelInfra } from 'infra/mongoose/models'

export default class SessionMongoDBRepositoryInfra implements SessionRepository {
  private readonly resultAdapter = (res: any): SessionEntity => {
    const result = res?.toJSON()
    return {
      ...result,
      id: result._id
    }
  }

  async create (tokens: SessionEntity): Promise<SessionEntity> {
    return await SessionModelInfra.create(tokens)
      .then((res: any) => this.resultAdapter(res))
  }

  async getByRefreshToken (refreshToken: string): Promise<SessionEntity> {
    return await SessionModelInfra.findOne({ refreshToken })
      .then((res: any) => this.resultAdapter(res))
  }

  async getByAccessToken (accessToken: string): Promise<SessionEntity> {
    return await SessionModelInfra.findOne({ accessToken })
      .then((res: any) => this.resultAdapter(res))
  }

  async getByUserId (userId: string): Promise<SessionEntity> {
    return await SessionModelInfra.findOne({ userId })
      .then((res: any) => this.resultAdapter(res))
  }

  async update (
    refreshToken: string,
    newAccessToken: string
  ): Promise<void> {
    await SessionModelInfra.updateOne(
      { refreshToken },
      { accessToken: newAccessToken }
    )
  }

  async deleteByRefreshToken (refreshToken: string): Promise<void> {
    await SessionModelInfra.deleteOne({ refreshToken })
  }

  async deleteByAccessToken (accessToken: string): Promise<void> {
    await SessionModelInfra.deleteOne({ accessToken })
  }

  private exist (result: any): boolean {
    return result !== null && result !== undefined
  }

  async existByRefreshToken (refreshToken: string): Promise<boolean> {
    return await SessionModelInfra.exists({ refreshToken })
      .then((res: any) => this.exist(res))
  }

  async existByAccessToken (accessToken: string): Promise<boolean> {
    return await SessionModelInfra.exists({ accessToken })
      .then((res: any) => this.exist(res))
  }

  async existByUserId (userId: string): Promise<boolean> {
    return await SessionModelInfra.exists({ userId })
      .then((res: any) => this.exist(res))
  }
}
