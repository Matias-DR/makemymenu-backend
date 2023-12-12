import type { SessionEntity } from '0.domain/entities'
import {
  NotFoundOperationException,
  UnsuccessfulOperationException
} from '0.domain/exceptions/operation.exceptions'
import type { SessionRepository } from '0.domain/repositories'
import { SessionModelImplementation } from '5.infraestructure/database/mongodb/models'

export default class SessionMongoDBRepositoryImplementation implements SessionRepository {
  async delete (accessToken: string): Promise<void> {
    try {
      await SessionModelImplementation.deleteOne({ accessToken })
    } catch (error) {
      throw new UnsuccessfulOperationException()
    }
  }

  async create (tokens: {
    refreshToken: string
    accessToken: string
  }): Promise<SessionEntity> {
    try {
      const result = await SessionModelImplementation.create(tokens)
      const resultToJson = result.toJSON()
      return {
        id: resultToJson._id.toString(),
        refresh: resultToJson.refreshToken,
        access: resultToJson.accessToken
      }
    } catch (error) {
      throw new UnsuccessfulOperationException()
    }
  }

  async getByRefreshToken (refreshToken: string): Promise<any> {
    try {
      const result = await SessionModelImplementation.findOne({ refreshToken })
      return result
    } catch (error) {
      throw new NotFoundOperationException()
    }
  }

  async getByAccessToken (accessToken: string): Promise<any> {
    try {
      const result = await SessionModelImplementation.findOne({ accessToken })
      return result === undefined || result === null
    } catch (error) {
      throw new NotFoundOperationException()
    }
  }

  async updateTokens (
    refreshToken: string,
    newTokens: {
      refreshToken: string
      accessToken: string
    }
  ): Promise<void> {
    try {
      await SessionModelImplementation.updateOne(
        { refreshToken },
        {
          refreshToken: newTokens.refreshToken,
          accessToken: newTokens.accessToken
        }
      )
    } catch (error) {
      throw new UnsuccessfulOperationException()
    }
  }

  async updateAccessToken (
    accessToken: string,
    newAccessToken: string
  ): Promise<void> {
    try {
      await SessionModelImplementation.updateOne(
        { accessToken },
        { accessToken: newAccessToken }
      )
    } catch (error) {
      throw new UnsuccessfulOperationException()
    }
  }
}
