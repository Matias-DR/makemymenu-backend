import type { SessionEntity } from 'domain/entities'
import type { SessionRepository } from 'domain/repositories'
import { SessionModelImpl } from 'impl/mongoose/models'

export default class SessionMongoDBRepositoryImpl implements SessionRepository {
  async create (tokens: SessionEntity): Promise<SessionEntity> {
    return await SessionModelImpl.create(tokens)
      .then((res: any) => res?.toJSON())
  }

  async getByRefreshToken (refreshToken: string): Promise<SessionEntity> {
    return await SessionModelImpl.findOne({ refreshToken })
      .then((res: any) => res?.toJSON())
  }

  async getByAccessToken (accessToken: string): Promise<SessionEntity> {
    return await SessionModelImpl.findOne({ accessToken })
      .then((res: any) => res?.toJSON())
  }

  async update (
    refreshToken: string,
    newAccessToken: string
  ): Promise<SessionEntity> {
    return await SessionModelImpl.updateOne(
      { refreshToken },
      { accessToken: newAccessToken }
    )
      .then((res: any) => res?.toJSON())
  }

  async deleteByRefreshToken (refreshToken: string): Promise<SessionEntity> {
    return await SessionModelImpl.deleteOne({ refreshToken })
      .then((res: any) => res?.toJSON())
  }

  async deleteByAccessToken (accessToken: string): Promise<SessionEntity> {
    return await SessionModelImpl.deleteOne({ accessToken })
      .then((res: any) => res?.toJSON())
  }

  async existByRefreshToken (refreshToken: string): Promise<boolean> {
    return await SessionModelImpl.exists({ refreshToken })
      .then((res: any) => res)
  }

  async existByAccessToken (accessToken: string): Promise<boolean> {
    return await SessionModelImpl.exists({ accessToken })
      .then((res: any) => res)
  }
}
