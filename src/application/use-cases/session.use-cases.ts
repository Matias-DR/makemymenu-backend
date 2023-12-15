import type { SessionEntity } from 'domain/entities'
import { NotFoundOperationException, UnsuccessfulOperationException } from 'domain/exceptions/operation.exceptions'
import type { SessionRepository } from 'domain/repositories'
import { createAccessToken, createRefreshToken, decodeToken } from 'utils/token.util'
import { SessionServices } from 'application/services'

export default class SessionUseCases {
  private readonly services: SessionServices

  constructor (private readonly repository: SessionRepository) {
    this.services = new SessionServices(this.repository)
  }

  async deleteByAccessToken (accessToken: string): Promise<void> {
    await this.services.existByAccessToken(accessToken)
    await this.repository.deleteByAccessToken(accessToken)
  }

  async create (input: {
    id: string
    email: string
  }): Promise<SessionEntity> {
    const refreshToken = createRefreshToken(input)
    const accessToken = createAccessToken(input)
    const tokens = {
      refreshToken,
      accessToken
    }
    let exception = new UnsuccessfulOperationException()
    try {
      await this.services.existByRefreshToken(refreshToken)
    } catch (error: any) {
      if (error instanceof NotFoundOperationException) {
        return await this.repository.create(tokens)
      } else {
        exception = error
      }
    }
    throw exception
  }

  async updateAccessToken (accessToken: string): Promise<string> {
    await this.services.existByAccessToken(accessToken)
    const decoded = decodeToken(accessToken)
    const data = {
      id: decoded.id,
      email: decoded.email
    }
    const newAccessToken = createAccessToken(data)
    await this.repository.updateAccessToken(
      accessToken,
      newAccessToken
    )
    return newAccessToken
  }
}
