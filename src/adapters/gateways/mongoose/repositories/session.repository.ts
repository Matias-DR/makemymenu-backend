import type { SessionEntity } from 'domain/entities'
import {
  NotFoundOperationException,
  UnsuccessfulOperationException
} from 'domain/exceptions/operation.exceptions'
import type { SessionRepository } from 'domain/repositories'
import { SessionModelImplementation } from 'adapters/gateways/mongoose/models'

export default class SessionMongoDBRepositoryImplementation implements SessionRepository {
  async deleteByAccessToken (accessToken: string): Promise<void> {
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
      const json = result.toJSON()
      const session = {
        id: json._id.toString(),
        refresh: json.refreshToken,
        access: json.accessToken
      }
      return session
    } catch (error) {
      throw new UnsuccessfulOperationException()
    }
  }

  async getByRefreshToken (refreshToken: string): Promise<SessionEntity> {
    try {
      const result = await SessionModelImplementation.findOne({ refreshToken })
      if (result === undefined || result === null) {
        throw new NotFoundOperationException()
      }
      const json = result.toJSON()
      const session = {
        id: json._id.toString(),
        refresh: json.refreshToken,
        access: json.accessToken
      }
      return session
    } catch (error) {
      if (!(error instanceof NotFoundOperationException)) {
        throw new UnsuccessfulOperationException()
      }
      throw error
    }
  }

  async getByAccessToken (accessToken: string): Promise<SessionEntity> {
    try {
      const result = await SessionModelImplementation.findOne({ accessToken })
      if (result === undefined || result === null) {
        throw new NotFoundOperationException()
      }
      const json = result.toJSON()
      const session = {
        id: json._id.toString(),
        refresh: json.refreshToken,
        access: json.accessToken
      }
      return session
    } catch (error) {
      if (!(error instanceof NotFoundOperationException)) {
        throw new UnsuccessfulOperationException()
      }
      throw error
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
