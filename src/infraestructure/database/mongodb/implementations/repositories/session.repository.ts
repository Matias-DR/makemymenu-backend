import {
  NotFoundOperationException,
  UnsuccessfulOperationException
} from 'domain/exceptions/operation.exceptions'
import type { SessionRepository } from 'domain/repositories'
import { SessionModelImplementation } from 'infraestructure/database/mongodb/implementations/models'

export default class SessionMongoDBRepositoryImplementation implements SessionRepository {
  async existByRefresh (refreshToken: string): Promise<boolean> {
    try {
      const result = await SessionModelImplementation.findOne({ refreshToken })
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
