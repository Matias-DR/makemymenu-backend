import type { SessionEntity } from 'domain/entities'
import type { SessionRepository } from 'domain/repositories'
import { SessionModelInfra } from 'infra/mongoose/models'

export default class SessionMongoDBRepositoryInfra implements SessionRepository {
  async create (tokens: SessionEntity): Promise<SessionEntity> {
    return await SessionModelInfra.create(tokens)
      .then((res: any) => res?.toJSON())
  }

  async getByRefreshToken (refreshToken: string): Promise<SessionEntity> {
    return await SessionModelInfra.findOne({ refreshToken })
      .then((res: any) => res?.toJSON())
  }

  async getByAccessToken (accessToken: string): Promise<SessionEntity> {
    return await SessionModelInfra.findOne({ accessToken })
      .then((res: any) => res?.toJSON())
  }

  async update (
    refreshToken: string,
    newAccessToken: string
  ): Promise<SessionEntity> {
    return await SessionModelInfra.updateOne(
      { refreshToken },
      { accessToken: newAccessToken }
    )
      .then((res: any) => res?.toJSON())
  }

  async deleteByRefreshToken (refreshToken: string): Promise<SessionEntity> {
    return await SessionModelInfra.deleteOne({ refreshToken })
      .then((res: any) => res?.toJSON())
  }

  async deleteByAccessToken (accessToken: string): Promise<SessionEntity> {
    return await SessionModelInfra.deleteOne({ accessToken })
      .then((res: any) => res?.toJSON())
  }

  async existByRefreshToken (refreshToken: string): Promise<boolean> {
    return await SessionModelInfra.exists({ refreshToken })
      .then((res: any) => res)
  }

  async existByAccessToken (accessToken: string): Promise<boolean> {
    return await SessionModelInfra.exists({ accessToken })
      .then((res: any) => res)
  }
}
