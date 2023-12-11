import {
  NotFoundOperationException,
  UnsuccessfulOperationException
} from '0.domain/exceptions/operation.exceptions'
import type { SessionRepository } from '0.domain/repositories'
import { SessionModelImplementation } from '6.infraestructure/database/mongodb/implementations/models'

export default class SessionMongoDBRepositoryImplementation implements SessionRepository {
  async createSession (tokens: {
    refreshToken: string
    accessToken: string
  }): Promise<void> {
    try {
      await SessionModelImplementation.create(tokens)
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
    refreshToken: string,
    newAccessToken: string
  ): Promise<void> {
    try {
      await SessionModelImplementation.updateOne(
        { refreshToken },
        { accessToken: newAccessToken }
      )
    } catch (error) {
      throw new UnsuccessfulOperationException()
    }
  }
}
